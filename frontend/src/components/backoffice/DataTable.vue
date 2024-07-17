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

    const itemToEdit = ref();
    const itemToDelete = ref();

    const deleteItem = item => {
      itemToDelete.value = item;
      showDeleteItemDialog.value = true;
    };

    const editItem = item => {
      itemToEdit.value = { ...item };
      showEditItemDialog.value = true;
    };

    const submitEditItem = async() => {
      try {
        const response = await axios.patch(`${base_url}/${itemToEdit.value.id}`, itemToEdit.value, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        showEditItemDialog.value = false;

        if (response.status !== 200) {
          //TODO: Show Error.
        }

      } catch (error) {
        // TODO: Show Error.
        console.error('Error updating item:', error);
        showEditItemDialog.value = false;
      }
    };

    const submitDeleteItem = async(item) => {
      try {
        const response = await axios.delete(`${base_url}/${item.id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status !== 204) {
          throw new Error('Failed to delete item');
        }

        // TODO: Reload DataTable + Close Modal.
        showDeleteItemDialog.value = false;
      } catch (error) {
        // TODO: Close Modal + Happen Error Modal.
        showEditItemDialog.value = false;
        console.error('Error deleting item:', error);
      }

    };

</script>

<template>
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
    <!-- Edit modal -->
    <v-dialog
      v-model="showEditItemDialog"
      width="500px"
    >
      <v-card class="text-center pa-5">
        <v-card-title>Modifier</v-card-title>
        <slot
          name="form"
          :item="itemToEdit"
          :submit="submitEditItem"
        />
      </v-card>
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
    <div
      v-if="data && data.length === 0"
      class="text-center text-gray-500"
    >
      Aucun résultat trouvé.
    </div>
  </div>
</template>