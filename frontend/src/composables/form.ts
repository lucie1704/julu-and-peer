import axios from 'axios';
import type { Reactive } from 'vue';
import { reactive, ref } from 'vue';
import type { ZodIssue, ZodTypeAny } from 'zod';
import { z } from 'zod';

export type RequestMethod = 'post' | 'put' | 'delete' | 'patch';

export interface ApiCall {
  method: RequestMethod;
  endpoint: string;
  jwt?: string;
}

type SchemaType = z.ZodObject<Record<string, ZodTypeAny>>;

export function useForm<T extends SchemaType>(
  schema: T,
  apiCall: ApiCall,
  onSubmit: (data: any) => Promise<void>,
  initialValues?: Partial<z.infer<T>>,
) {

  type FormData = z.infer<T>;

  const initializedValues = Object.fromEntries(
    Object.keys(schema.shape).map(key =>
      [key, ((initialValues && initialValues[key]) ? initialValues[key] : undefined)])
  );

  const formData        = reactive<FormData>({ ...initializedValues });
  const errors          = reactive<Partial<Record<keyof FormData, string[]>>>({});
  const serverError     = ref<string>();
  const isSubmitting    = ref(false);
  const isCancelled     = ref(false);
  const abortController = new AbortController();

  const updateField = <K extends keyof FormData>(field: K, value: Reactive<FormData[K]>) => {
    formData[field] = value;
    validateField(field);
  };

  const validateField = <K extends keyof FormData>(field: K) =>  {
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

  const handleSubmit = async() => {
    console.log('tete');
    serverError.value = undefined;
    isSubmitting.value = true;

    if (!validateForm()) {
      isSubmitting.value = false;
      return;
    }

    try {
      console.log('apiCall.endpoint', apiCall.endpoint);
      console.log('apiCall.method', apiCall.method);
      console.log('formData', formData);

      await axios[apiCall.method](apiCall.endpoint, formData, createRequestOptions(apiCall.jwt));
      console.log('prout');

      // const validatedData = schema.parse(fetchedData);
      await onSubmit('hhh');
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

  const createRequestOptions = (jwt_token?: string) => {
    if (jwt_token) {
      return  {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        }
      };
    } else {
      return  {
        signal: abortController.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      };
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