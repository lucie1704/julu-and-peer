<script lang="ts" setup>
    import axios from 'axios';
    import { ref } from 'vue';

    const props = defineProps<{
      data: Array<Record<string, any>> | null;
      loading: boolean;
      error: string | null;
      url: string;
    }>();

    // TODO: Use ENV variable for URL.
    const base_url = `http://localhost:3000/api/v1/${props.url}`;

    const showEditItemDialog = ref(false);
    const showDeleteItemDialog = ref(false);
    const showErrorDialog = ref(false);
    const errorMessage = ref('');

    const itemToEdit = ref();
    const itemToDelete = ref();
    const isEditing = ref(false);

    const deleteItem = item => {
      itemToDelete.value = item;
      showDeleteItemDialog.value = true;
    };

    const editItem = (item) => {
      itemToEdit.value = { ...item };
      isEditing.value = true;
      showEditItemDialog.value = true;
    };

    const initializeNewItem = () => {
      if (props.data && props.data.length > 0) {
        const newItem = {};
        Object.keys(props.data[0]).forEach(key => {
          newItem[key] = '';
        });
        return newItem;
      }
      return null;
    };

    const createNewItem = () => {
      itemToEdit.value = initializeNewItem();
      isEditing.value = false;
      showEditItemDialog.value = true;
    };

    const submitEditItem = async() => {
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
      } catch (error) {
        showEditItemDialog.value = false;
        showErrorDialog.value = true;
        errorMessage.value = error.response.data.message;
        console.error('Error updating item:', error);
      }
    };


    const submitDeleteItem = async(item) => {
      try {
        await axios.delete(`${base_url}/${item.id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // TODO: Reload DataTable
        showDeleteItemDialog.value = false;
      } catch (error) {
        showDeleteItemDialog.value = false;
        showErrorDialog.value = true;
        errorMessage.value = error.response.data.message;
        console.error('Error deleting item:', error);
      }

    };

</script>

<template>
  <button
    type="button"
    class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
    @click="createNewItem"
  >
    Nouveau
  </button>
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
              v-for="(value, key) in data[0]"
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
              {{ value }}
            </td>
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <button
                class="mr-2 text-indigo-600 hover:text-indigo-900"
                @click="editItem(item)"
              >
                Modifier
              </button>
              <button
                class="text-red-600 hover:text-red-900"
                @click="deleteItem(item)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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