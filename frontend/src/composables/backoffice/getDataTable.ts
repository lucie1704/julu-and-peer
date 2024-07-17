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

// const cleanData = (url, data) => {
//   switch (url) {
//     // Clean only for specific data if needed.
//       case 'users':
//           return data.map(user => ({
//             id: user.id,
//             prenom: user.firstname,
//             nom: user.lastname,
//             email: user.email,
//             role: user.role
//           }));
//       case 'products':
//           return data.map(product => ({
//               id: product.id,
//               image: product.imageSrc,
//               nom: product.name,
//               prix: product.price,
//               stock: product.availableStock,
//               reviews: product.reviewCount,
//               genre: product.ProductGenre.name,
//               format: product.ProductFormat.name,
//               artiste: product.ProductArtist.name,
//           }));
//       case 'productartists':
//         return data.map(artist => ({
//           id: artist.id,
//           nom: artist.name,
//           description: artist.description,
//         }));

//       case 'productformats':
//         return data.map(format => ({
//           id: format.id,
//           nom: format.name,
//           description: format.description,
//         }));

//       case 'productgenres':
//         return data.map(genre => ({
//           id: genre.id,
//           nom: genre.name,
//           description: genre.description,
//         }));
//       default:
//           return data;
//   }
// };

export const getDataTable = (url: string) => {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    // Ici on vas récupérer la data selon l'url que l'on donne au composable
    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(`${baseURL}${url}`);
            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la récupération des données.');
            }
            const jsonData = await response.json();

            // Ici on vas valider le schema avec Zod
            const schema = getSchema(url);
            const validatedData = schema.parse(jsonData.data);

            // On clean les données reçues
            // const cleanedData = cleanData(url, validatedData);

            // data.value = cleanedData;
            data.value = validatedData;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchData();
    });

    // On renvoie les données nécessaires.
    return {
        data,
        loading,
        error,
    };
};