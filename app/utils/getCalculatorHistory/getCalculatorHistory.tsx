import AsyncStorage from '@react-native-async-storage/async-storage';
import {iCalcHistory} from 'models';

const getCalculatorHistory = async (): Promise<iCalcHistory[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@calculatorHistory');
    const result: iCalcHistory[] = [];
    if (jsonValue !== null) {
      const parsed = JSON.parse(jsonValue);
      for (let i = 0; i < parsed.length; i++) {
        result.push({
          formula: parsed[i].formula,
          result: parsed[i].result,
          timestamp: parsed[i].timestamp,
          key: parsed[i].key,
        });
      }
      // result.reverse;
    }
    return result;
  } catch (e) {
    console.log('-- Error fetching Async Default Center --', e);
    return [];
  }
};

export default getCalculatorHistory;
