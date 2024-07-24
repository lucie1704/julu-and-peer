<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from '~/constants';
import { headers } from '~/utils/headers';

interface Props {
  itemId: string;
  deleteUrl: string;
  text: string
}
const props = defineProps<Props>();

const showConfirmModal = ref(false);
const isDeleting = ref(false);
const error = ref('');
const emit = defineEmits(['itemDeleted']);
const base_url = `${API_URL}/${props.deleteUrl}`;

const resetError = () => {
  error.value = '';
};

const openModal = () => {
  resetError();
  showConfirmModal.value = true;
};

const closeModal = () => {
  resetError();
  showConfirmModal.value = false;
};

const deleteData = async () => {
  isDeleting.value = true;
  error.value = '';

  try {
    //NOTE:Ligne du dessous pour prouver le chargement lors de la requête pendant la pres si besoin
    // await new Promise(resolve => setTimeout(resolve, 3000));
    await axios.delete(`${base_url}/${props.itemId}`, {
      headers: headers(),
    });
    emit('itemDeleted', props.itemId);
    closeModal();
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Une erreur innatendu est survenue.';
    }
  } finally {
    isDeleting.value = false;
  }
};

</script>

<template>
  <div>
    <button
      class="text-red-600 hover:bg-gray-100 rounded-full"
      :disabled="isDeleting"
      @click="openModal"
    >
      <i class="fa-regular fa-trash-can text-xl py-2 px-3" />
    </button>

    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-5 rounded-md text-center">
        <p>Êtes vous certain de vouloir supprimer {{ text }} ?</p>
        <button
          class="bg-gray-500 text-white border-none py-2.5 px-5 cursor-pointer text-base rounded-md m-1.5 hover:bg-gray-800"
          :disabled="isDeleting"
          @click="deleteData"
        >
          {{ isDeleting ? 'Suppression en cours...' : 'Confirmer' }}
        </button>
        <button
          class="bg-gray-500 text-white border-none py-2.5 px-5 cursor-pointer text-base rounded-md m-1.5 hover:bg-gray-800"
          :disabled="isDeleting"
          @click="closeModal"
        >
          Annuler
        </button>
        <p
          v-if="error"
          class="text-red mt-2"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>