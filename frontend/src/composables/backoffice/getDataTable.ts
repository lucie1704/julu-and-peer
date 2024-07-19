import { ref, onMounted } from "vue";
import { ZodSchema, z } from "zod";

const baseURL = 'http://localhost:3000/api/v1/'; //TODO: Maybe use an ENV variable for prod or local

// On défini des schémas Zod dynamique pour toutes les données
const getSchema = (url: string): ZodSchema<any> => {
    switch (url) {
        case 'users':
          return z.array(
            z.object({
                id: z.number(),
                firstname: z.string(),
                lastname: z.string(),
                email: z.string().email(),
                photo: z.string(),
                role: z.string(),
                createdAt: z.string().datetime(),
                updatedAt: z.string().datetime(),
                Customer: z.object({
                    id: z.number(),
                    userId: z.number(),
                    firstName: z.string(),
                    lastName: z.string(),
                    createdAt: z.string().datetime(),
                    updatedAt: z.string().datetime()
                }).nullable()
            })
          );
        case 'products':
          return z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                description: z.string(),
                price: z.string().regex(/^\d+(\.\d{2})?$/),
                availableStock: z.number(),
                imageSrc: z.string().nullable(),
                imageAlt: z.string().nullable(),
                reviewCount: z.number().nullable(),
                ProductGenre: z.object({
                    id: z.number(),
                    name: z.string(),
                    description: z.string()
                }).nullable(),
                ProductFormat: z.object({
                    id: z.number(),
                    name: z.string(),
                    description: z.string()
                }).nullable(),
                ProductArtist: z.object({
                    id: z.number(),
                    name: z.string(),
                    description: z.string()
                }).nullable(),
            })
          );
        case 'productartists':
          return z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              description: z.string()
            })
          );
        case 'productformats':
          return z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              description: z.string()
            })
          );
        case 'productgenres':
          return z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              description: z.string()
            })
          );
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
    const error = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);

    // Ici on vas récupérer la data selon l'url que l'on donne au composable
    const fetchData = async (page = 1) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(`${baseURL}${url}?page=${page}`);
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
            error.value = err.message;
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