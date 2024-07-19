import { defineStore } from 'pinia';
import { ref } from 'vue';
import customerAPI from '~/api/customer';
import { CustomerI, CustomerUpdateI } from '~/dto/customer';
import router from '~/router/router';

const handleAsyncAction = async <T>(action: () => Promise<T>): Promise<T | null> => {
  try {
    return await action();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const useCustomer = defineStore('customer', () => {
  const customer = ref<CustomerI | null>(null);
  const customerId = ref<string | null>(null);

  const fetchById = async (customerId: string) => {
    const jwt_token = '';
    const response = await handleAsyncAction(() => customerAPI.getById(customerId, jwt_token));
    customer.value = response;
  };

  const fetchByUserId = async (userId: string) => {
    const jwt_token = '';
    const response = await handleAsyncAction(() => customerAPI.getByUserId(userId, jwt_token));
    customer.value = response;
    customerId.value = response?.id ? String(response.id) : null;
  };

  const update = async (customerId: string, customerData: CustomerUpdateI) => {
    const jwt_token = '';
    const response = await handleAsyncAction(() => customerAPI.update(customerId, customerData, jwt_token));
    customer.value = response;
  };

  const remove = async (customerId: string) => {
    const jwt_token = '';
    const response = await handleAsyncAction(() => customerAPI.delete(customerId, jwt_token));
    if (response === null) {
      console.error('Failed to delete customer');
      return;
    }
    customer.value = null;
    router.push({ name: 'home' });
  };

  return {
    customer,
    customerId,
    fetchById,
    fetchByUserId,
    update,
    remove,
  };
});
