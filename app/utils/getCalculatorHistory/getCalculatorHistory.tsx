import AsyncStorage from '@react-native-async-storage/async-storage';
import {iCalcHistory} from 'models';

const getCalculatorHistory = async (): Promise<iCalcHistory[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@calculatorHistory');
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('-- Error fetching Async Default Center --', e);
    return [];
  }
};

export default getCalculatorHistory;
