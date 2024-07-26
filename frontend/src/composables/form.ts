import axios from 'axios';
import type { Reactive } from 'vue';
import { reactive, ref } from 'vue';
import type { ZodIssue, ZodTypeAny } from 'zod';
import { z } from 'zod';
import { headers } from '~/utils/headers';

export type RequestMethod = 'post' | 'put' | 'delete' | 'patch';

export interface ApiCall {
  method: RequestMethod;
  endpoint: string;
}

type SchemaType = z.ZodObject<Record<string, ZodTypeAny>>;

export function useForm<T extends SchemaType>(
  schema: T,
  apiCall: ApiCall,
  onSubmit: (data: any) => Promise<void>,
  initialValues?: Partial<z.infer<T>>,
) {

  type FormData = Partial<z.infer<T>>;

  const initializedValues = Object.fromEntries(
    Object.keys(schema.shape).map(key =>
      [key, ((initialValues && initialValues[key]) ? initialValues[key] : undefined)])
  ) as FormData;

  const formData = reactive<FormData>({ ...initializedValues });
  const errors = reactive<Partial<Record<keyof FormData, string[]>>>({});
  const serverError = ref<string>();
  const isSubmitting = ref(false);
  const isCancelled = ref(false);
  const abortController = new AbortController();

  const updateField = <K extends keyof FormData>(field: K, value: Reactive<FormData>[K]) => {
    formData[field] = value;
    validateField(field);
  };

  const validateField = <K extends keyof FormData>(field: K) => {
    const fieldSchema = schema.shape[field as string];
    const result = fieldSchema.safeParse(formData[field]);
    if (!result.success) {
      const fetchedErrors = result.error.errors.map((error: ZodIssue) => error.message);
      (errors[field] as string[]) = fetchedErrors;
    } else {
      delete errors[field];
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    Object.keys(schema.shape).forEach((field) => {
      validateField(field as keyof FormData);
      if (errors[field as keyof FormData]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async () => {
    console.log('handleSubmit was called');
    serverError.value = undefined;
    isSubmitting.value = true;

    if (!validateForm()) {
      console.log('Invalid form');
      isSubmitting.value = false;
      return;
    }

    try {
      const dataToSend = formatData(formData);
      console.log('sending request with', dataToSend);
      const fetchedData = await axios[apiCall.method](apiCall.endpoint, dataToSend, {
        headers: headers(),
      });
      await onSubmit(fetchedData.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof FormData;
            (errors[field] as string[])?.push(err.message);
          }
        });
      } else {
        serverError.value = 'Une erreur s\'est produite lors de la soumission du formulaire';
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  const formatData = (data: FormData): FormData => {
    const { ...extractedData } = data;
    const formattedData: Record<string, any> = {};

    Object.keys(extractedData).forEach(key => {
      if (typeof data[key] === 'object' && extractedData[key] !== null) {
        formattedData[key] = { ...extractedData[key] };
      } else {
        formattedData[key] = extractedData[key];
      }
    });
    return formattedData;
  };

  const resetForm = () => {
    const resetValues = Object.fromEntries(Object.keys(schema.shape).map(key => [key, undefined]));
    Object.assign(formData, resetValues);
    Object.keys(errors).forEach(key => delete errors[key as keyof FormData]);
    serverError.value = undefined;
  };

  const cancelSubmit = () => {
    if (isSubmitting.value) {
      isCancelled.value = true;
      abortController.abort();
    }
  };

  return {
    formData,
    errors,
    serverError,
    isSubmitting,
    updateField,
    cancelSubmit,
    handleSubmit,
    resetForm
  };
}