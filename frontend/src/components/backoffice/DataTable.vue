<script lang="ts" setup>
  import axios from 'axios';
  import { computed, ref } from 'vue';
  import { API_URL } from '~/constants';

  const props = defineProps<{
    data: Array<Record<string, any>> | null;
    loading: boolean;
    error: string | null;
    url: string;
    newItem: object | undefined;
    currentPage: number,
    totalPages: number,
    setPage: (page: number) => void
    refresh: () => void
  }>();

  const base_url = `${API_URL}/${props.url}`;

  const showEditItemDialog = ref(false);
  const showDeleteItemDialog = ref(false);
  const showErrorDialog = ref(false);
  const errorMessage = ref('');

  const itemToEdit = ref();
  const itemToDelete = ref();
  const isEditing = ref(false);

  const deleteItem = (item: Record<string, any>) => {
    itemToDelete.value = item;
    showDeleteItemDialog.value = true;
  };

  const editItem = (item: Record<string, any>) => {
    itemToEdit.value = { ...item };
    isEditing.value = true;
    showEditItemDialog.value = true;
  };

  const createNewItem = () => {
    itemToEdit.value = { ...props.newItem };
    isEditing.value = false;
    showEditItemDialog.value = true;
  };

  // Submit logic for create and edit
  const submitEditItem = async() => {
    // Deconstruct id in order to not have it in req.body
    const { id, ...data } = itemToEdit.value;
    try {
      if (isEditing.value) {
        await axios.patch(`${base_url}/${id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        await axios.post(base_url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      showEditItemDialog.value = false;
      props.refresh();
    } catch (error) {
      showEditItemDialog.value = false;
      showErrorDialog.value = true;
      if (axios.isAxiosError(error) && error.response) {
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value = 'Une erreur innatendu est survenue.';
      }
    }
  };

  // Submit logic for delete
  const submitDeleteItem = async(item: Record<string, any>) => {
    try {
      await axios.delete(`${base_url}/${item.id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      showDeleteItemDialog.value = false;
      props.refresh();
    } catch (error) {
      showDeleteItemDialog.value = false;
      showErrorDialog.value = true;
      if (axios.isAxiosError(error) && error.response) {
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value = 'Une erreur innatendu est survenue.';
      }
    }
  };

  // This part is for cleaning value before show in DataTable
  const cleanDisplayValue = (value: any) => {
    if (Array.isArray(value)) {
      // Traitement spécifiques si on as des données dans un tableaux.
      if (value.length > 0 && value[0].path) {
        return value.map((img: any) => img.alt || 'No alt text').join(' ');
      } else {
        // Retourne une string vide si on as rien.
        return '';
      }
    } else if (value && typeof value === 'object' && value.name) {
      return value.name;
    } else if (value && typeof value === 'object' && value.firstName && value.lastName) {
      return `${value.firstName} ${value.lastName}`;
    }
    return value;
  };

  // This part is for pagination logic
  const maxPagesToShow = 3;
  const pagesToShow = computed(() => {
    const pages = [];
    let startPage = Math.max(1, props.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > props.totalPages) {
      endPage = props.totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  });

</script>

<template>
  <div class="text-right">
    <button
      type="button"
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
      @click="createNewItem"
    >
      Nouveau
    </button>
  </div>

  <div class="container p-4 mx-auto">
    <div
      v-if="loading"
      class="text-center text-gray-500"
    >
      Chargement...
    </div>
    <div
      v-if="error"
      class="text-center text-red-500"
    >
      {{ error }}
    </div>
    <div class="overflow-x-auto">
      <table
        v-if="data && data.length > 0"
        class="min-w-full divide-y divide-gray-200"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="key in Object.keys(data[0])"
              :key="key"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              {{ key }}
            </th>
            <th
              class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="item in data"
            :key="item.id"
          >
            <td
              v-for="(value, key) in item"
              :key="key"
              class="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
            >
              {{ cleanDisplayValue(value) }}
            </td>
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <button
                class="mr-2 text-indigo-600 hover:bg-gray-100 rounded-full"
                @click="editItem(item)"
              >
                <i class="fa-regular fa-edit text-xl py-2 px-3" />
              </button>
              <button
                class="text-red-600 hover:bg-gray-100 rounded-full"
                @click="deleteItem(item)"
              >
                <i class="fa-regular fa-trash-can text-xl py-2 px-3" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="totalPages > 1"
      class="flex justify-center mt-4"
    >
      <button
        :disabled="currentPage === 1"
        class="px-3 py-1 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
        @click="setPage(1)"
      >
        Première
      </button>
      <button
        :disabled="currentPage === 1"
        class="px-3 py-1 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
        @click="setPage(currentPage - 1)"
      >
        <
      </button>
      <button
        v-for="page in pagesToShow"
        :key="page"
        :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page}"
        class="px-3 py-1 mx-1 rounded hover:bg-blue-600 hover:text-white"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="px-3 py-1 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
        @click="setPage(currentPage + 1)"
      >
        >
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="px-3 py-1 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
        @click="setPage(totalPages)"
      >
        Dernière
      </button>
    </div>
    <!-- Create/Edit modal -->
    <v-dialog
      v-model="showEditItemDialog"
      width="500px"
    >
      <slot
        name="form"
        :item="itemToEdit"
        :submit="submitEditItem"
      />
    </v-dialog>
    <!-- Delete modal -->
    <v-dialog
      v-model="showDeleteItemDialog"
      width="500px"
    >
      <v-card class="text-center pa-5">
        <v-card-title>Êtes-vous sûr de vouloir supprimer "{{ itemToDelete.name }}" ? </v-card-title>
        <v-row>
          <v-col>
            <v-btn
              color="blue"
              @click="submitDeleteItem(itemToDelete)"
            >
              Supprimer
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- Error modal -->
    <v-dialog
      v-model="showErrorDialog"
      width="500px"
    >
      <v-card class="text-center pa-5">
        <v-card-title>Oups une erreur est survenue..</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-row>
          <v-col>
            <v-btn
              color="red"
              @click="showErrorDialog = false"
            >
              Fermer
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <div
      v-if="data && data.length === 0"
      class="text-center text-gray-500"
    >
      Aucun résultat trouvé.
    </div>
  </div>
</template>