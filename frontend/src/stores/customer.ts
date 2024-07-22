import { defineStore } from 'pinia';
import { ref } from 'vue';
import customerAPI from '~/api/customer';
import { Customer, CustomerUpdateI } from '~/dto/customer';
import router from '~/router/router';

export const useCustomer = defineStore('customer', () => {
  const customer = ref<Customer>();
  const customerId = ref<string>('');
  const message = ref<string | null>(null);

  const fetchById = async (id: string) => {
    try {
      const response = await customerAPI.getById(id);
      customer.value = response;
    } catch (error) {
      message.value = `Échec de la récupération du client par ID : ${error}`;
    }
  };

  const fetchByUserId = async (userId: string) => {
    try {
      const response = await customerAPI.getByUserId(userId);
      customer.value = response;
      customerId.value = response?.id;
    } catch (error) {
      message.value = `Échec de la récupération du client par User ID : ${error}`;
    }
  };

  const update = async (id: string, customerData: CustomerUpdateI) => {
    try {
      const response = await customerAPI.update(id, customerData);
      customer.value = response;
    } catch (error) {
      message.value = `Échec de la mise à jour du client : ${error}`;
    }
  };

  const remove = async (id: string) => {
    try {
      await customerAPI.delete(id);
      router.push({ name: 'home' });
    } catch (error) {
      message.value = `Échec de la suppression du client : ${error}`;
    }
  };

  return {
    customer,
    customerId,
    message,
    fetchById,
    fetchByUserId,
    update,
    remove,
  };
});