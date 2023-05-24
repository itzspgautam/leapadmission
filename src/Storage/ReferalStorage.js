import AsyncSorage from '@react-native-async-storage/async-storage';

const setReferalStorage = link => {
  return AsyncSorage.setItem('refer', JSON.stringify(link));
};

const getReferalStorage = () => {
  return AsyncSorage.getItem('refer');
};

export {setReferalStorage, getReferalStorage};
