export const handleAsyncAction = async <T>(action: () => Promise<T>): Promise<T | null> => {
  try {
    return await action();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
