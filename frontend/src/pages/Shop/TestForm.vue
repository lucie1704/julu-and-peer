<route lang="yaml">
  path: /test
  name: test
  meta:
    layout: AppLayout
</route>

<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { useForm } from '~/composables/form';

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('L\'email n\'est pas valide'),
  age: z.number().min(18, 'Vous devez avoir au moins 18 ans')
});

const initialValues = {
  email: 'john@example.com',
  age: 30
};

const myApiCall = ref<string>('http://localhost:3000/api/products');

const onSubmit = async(data: any) => {
  console.log(data);
};

const {
  formData,
  errors,
  serverError,
  isSubmitting,
  updateField,
  cancelSubmit,
  handleSubmit,
  resetForm
} = useForm(
  schema,
  { method: 'get', endpoint: myApiCall.value, jwt: '' },
  onSubmit,
  initialValues
);

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h2">
            Test formulaire
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="formData.name"
            name="name"
            label="Nom"
            :error-messages="errors.name"
            @input="updateField('name', formData.name)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="formData.email"
            name="email"
            label="Email"
            :error-messages="errors.email"
            @input="updateField('email', formData.email)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model.number="formData.age"
            name="age"
            type="number"
            label="Âge"
            :error-messages="errors.age"
            @input="updateField('age', formData.age)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div v-if="serverError">
            {{ serverError }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            type="submit"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            variant="outlined"
            color="blue"
          >
            Envoyer
          </v-btn>
          <v-btn
            :disabled="isSubmitting"
            @click="cancelSubmit"
          >
            Annuler
          </v-btn>
          <v-btn @click="resetForm">
            Réinitialiser
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>