import { ref, onMounted } from 'vue';
import { Options } from '~/dto/options';

const baseURL = 'http://localhost:3000/api/v1/'; //TODO: Maybe use an ENV variable for prod or local

export const getDataOptions = (url: string) => {
  const options = ref<Options>({});
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchOptions = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${baseURL}${url}/options`);

      const jsonData = await response.json();

      options.value = jsonData;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Une erreur innatendu est survenue.';
      }
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchOptions();
  });

  return {
    options,
    loading,
    error,
  };
};