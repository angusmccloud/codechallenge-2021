import AsyncStorage from '@react-native-async-storage/async-storage';

const setTimerDefaults = async (
  task: number,
  breakLength: number,
  longBreak: number,
): Promise<void> => {
  const obj = {
    task,
    break: breakLength,
    longBreak,
  };
  try {
    const jsonValue = JSON.stringify(obj);
    await AsyncStorage.setItem('@timerDefaults', jsonValue);
  } catch (e) {
    console.log('-- Error Saving Default Timer Values --', e);
  }
};

export default setTimerDefaults;
