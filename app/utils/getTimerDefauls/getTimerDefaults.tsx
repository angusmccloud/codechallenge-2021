import AsyncStorage from '@react-native-async-storage/async-storage';

const getTimerDefaults = async (): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@timerDefaults');
    // Default values for the timers if the user hasn't overridden
    let result = {
      task: 25 * 60 * 1000,
      break: 5 * 60 * 1000,
      longBreak: 25 * 60 * 1000
    };
    if (jsonValue !== null) {
      const parsed = JSON.parse(jsonValue);
      result = {
        task: parsed.task,
        break: parsed.break,
        longBreak: parsed.longBreak,
      };
    }
    return result;
  } catch (e) {
    console.log('-- Error fetching Async Timer Defaults --', e);
    return [];
  }
};

export default getTimerDefaults;
