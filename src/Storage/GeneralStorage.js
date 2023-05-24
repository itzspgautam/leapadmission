import AsyncSorage from '@react-native-async-storage/async-storage';

const setStorageFirstTime = isFirstTime => {
  return AsyncSorage.setItem('isFirstTime', isFirstTime.toString());
};

const getStorageFirstTime = () => {
  return AsyncSorage.getItem('isFirstTime');
};

export {setStorageFirstTime, getStorageFirstTime};
