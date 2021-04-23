import AsyncStorage from '@react-native-async-storage/async-storage';

const getTimerHistory = async (): Promise<any[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@timerHistory');
    const result = [];
    if (jsonValue !== null) {
      const parsed = JSON.parse(jsonValue);
      for (let i = 0; i < parsed.length; i++) {
        result.push({
          timestamp: new Date(parsed[i].timestamp),
          key: parsed[i].key,
        });
      }
    }
    return result;
  } catch (e) {
    console.log('-- Error fetching Async Timer History --', e);
    return [];
  }
};

export default getTimerHistory;
