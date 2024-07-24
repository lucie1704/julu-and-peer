import { onMounted, ref } from 'vue';
import { z, ZodSchema } from 'zod';
import { API_URL } from '~/constants';
import { CategorySchema, ProductSchema } from '~/schema/productSchema';
import { UserSchema } from '~/schema/userSchema';
import { headers } from '~/utils/headers';

// On défini des schémas Zod dynamique pour toutes les données
const getSchema = (url: string): ZodSchema<any> => {
    switch (url) {
        case 'users':
          return z.array(UserSchema);
        case 'products':
          return z.array(ProductSchema);
        case 'productartists':
          return z.array(CategorySchema);
        case 'productformats':
          return z.array(CategorySchema);
        case 'productgenres':
          return z.array(CategorySchema);
        case 'orders':
          // TODO: Orders after.
          return z.array(z.object({}));
        default:
          // Si on trouve pas, on renvoie un schema par défaut.
          return z.array(z.object({}));
    }
};

export const getDataTable = (url: string) => {
    const data = ref(null);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const currentPage = ref(1);
    const totalPages = ref(1);

    // Ici on vas récupérer la data selon l'url que l'on donne au composable
    const fetchData = async (page = 1) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(`${baseURL}${url}?page=${page}`, {
                headers: headers()
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la récupération des données.');
            }

            const jsonData = await response.json();

            // Ici on vas valider le schema avec Zod
            const schema = getSchema(url);
            const validatedData = schema.parse(jsonData.data);

            data.value = validatedData;
            currentPage.value = page;
            totalPages.value = jsonData.totalPages;
        } catch (err) {
          if (err instanceof Error) {
            error.value = err.message;
          } else {
            error.value = 'Une erreur inattendue est survenue.';
          }
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchData();
    });

    const setPage = (page: number) => {
        if (page > 0 && page <= totalPages.value) {
            fetchData(page);
        }
    };

    // On renvoie les données nécessaires.
    return {
        data,
        loading,
        error,
        currentPage,
        totalPages,
        setPage,
        refresh: fetchData,
    };
};