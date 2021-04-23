import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const setTimerHistory = async (
  timestamp: Date,
  currentHistory: any[],
): Promise<void> => {
  const key: string = uuid.v4();
  const obj = {
    timestamp,
    key,
  };
  currentHistory.unshift(obj);
  try {
    const jsonValue = JSON.stringify(currentHistory);
    await AsyncStorage.setItem('@timerHistory', jsonValue);
  } catch (e) {
    console.log('-- Error Saving Timer History --', e);
  }
};

export default setTimerHistory;
