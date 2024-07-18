import { ref, onMounted } from 'vue';

const baseURL = 'http://localhost:3000/api/v1/'; //TODO: Maybe use an ENV variable for prod or local

export const getDataOptions = (url: string) => {
  const options = ref({});
  const loading = ref(true);
  const error = ref(null);

  const fetchOptions = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${baseURL}${url}/options`);

      const jsonData = await response.json();

      options.value = jsonData;
    } catch (err) {
      error.value = err.message;
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