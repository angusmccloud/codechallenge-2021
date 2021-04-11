import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {iCalcHistory} from 'models';

const setCalculatorHistory = async (
  formula: string,
  result: number,
  timestamp: Date,
  currentHistory: any[],
): Promise<void> => {
  const key: string = uuid.v4();
  const obj: iCalcHistory = {
    formula,
    result,
    timestamp,
    key
  };
  currentHistory.unshift(obj);
  try {
    const jsonValue = JSON.stringify(currentHistory);
    await AsyncStorage.setItem('@calculatorHistory', jsonValue);
  } catch (e) {
    console.log('-- Error Saving Calculator History --', e);
  }
};

export default setCalculatorHistory;
