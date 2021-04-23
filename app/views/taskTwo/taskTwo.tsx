import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  LogBox,
} from 'react-native';
import {Text, Button} from 'components';
import {plusMinusButtonSection} from 'containers';
import {SkypeIndicator} from 'react-native-indicators';
import {Styles, Colors} from 'styles';
import {
  getTimerDefaults,
  setTimerDefaults,
  getTimerHistory,
  setTimerHistory,
  millisecondsToTime,
} from 'utils';

const deviceWidth = Dimensions.get('window').width;

const TaskTwoScreen = ({route, navigation}): React.ReactElement => {
  const [taskLength, setTaskLength] = useState(0);
  const [breakLength, setBreakLength] = useState(0);
  const [longBreakLength, setLongBreakLength] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [mode, setMode] = useState('task');
  const [endTime, setEndTime] = useState(new Date().getTime());
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [appBackground, setAppBackground] = useState(Colors.appBackground);
  const [textColor, setTextColor] = useState(Colors.textDefault);
  const emptyArray: any[] = []; // Annoying thing to silence Typescript
  const [history, setHistory] = useState(emptyArray);

  const loadDefaultTimes = async () => {
    const times = await getTimerDefaults();
    setTaskLength(times.task);
    setBreakLength(times.break);
    setLongBreakLength(times.longBreak);
    setEndTime(new Date().getTime() + times.task);
    setTimeLeft(times.task);
  };

  const loadHistory = async () => {
    const hist = await getTimerHistory();
    setHistory(hist);
  };

  useEffect(() => {
    loadDefaultTimes();
    loadHistory();
    // Reanimated v2 still displays this warning sometimes even when the option is set, hiding it
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timerRunning) {
        setTimeLeft(endTime - new Date().getTime());
        backgroundSwap();
      }
    }, 200);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const fullTime =
    mode === 'task'
      ? taskLength
      : mode === 'break'
      ? breakLength
      : longBreakLength;

  const backgroundSwap = () => {
    if (timeLeft < 0 && timerRunning) {
      if (appBackground === Colors.buttonPrimaryBackground) {
        setAppBackground(Colors.appBackground);
        setTextColor(Colors.textDefault);
      } else {
        setAppBackground(Colors.buttonPrimaryBackground);
        setTextColor(Colors.appBackground);
      }
    }
  };

  const toggleTimer = () => {
    setEndTime(new Date().getTime() + timeLeft);
    setTimerRunning(!timerRunning);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setAppBackground(Colors.appBackground);
    setTextColor(Colors.textDefault);

    let newMode = mode === 'task' ? 'break' : 'task';
    let newTimeLeft = mode === 'task' ? breakLength : taskLength;
    if (mode === 'task') {
      let newCompleted = completedTasks + 1;
      setCompletedTasks(newCompleted);
      if (newCompleted > 0 && newCompleted % 4 === 0) {
        newMode = 'longBreak';
        newTimeLeft = longBreakLength;
      }
      setTimerHistory(new Date(), history); // update local storage
    }

    setTimeLeft(newTimeLeft);
    setMode(newMode);
  };

  const resetTimer = () => {
    setTimeLeft(fullTime);
  };

  const decreaseTime = (category: string) => {
    if (!timerRunning) {
      if (category === 'task') {
        const newLength =
          taskLength > 60 * 1000 ? taskLength - 60 * 1000 : taskLength;
        if (taskLength === timeLeft && mode === 'task') {
          setTimeLeft(newLength);
        }
        setTaskLength(newLength);
        setTimerDefaults(newLength, breakLength, longBreakLength);
      } else if (category === 'break') {
        const newLength =
          breakLength > 60 * 1000 ? breakLength - 60 * 1000 : breakLength;
        if (breakLength === timeLeft && mode === 'break') {
          setTimeLeft(newLength);
        }
        setBreakLength(newLength);
        setTimerDefaults(taskLength, newLength, longBreakLength);
      } else if (category === 'longBreak') {
        const newLength =
          longBreakLength > 60 * 1000
            ? longBreakLength - 60 * 1000
            : longBreakLength;
        if (longBreakLength === timeLeft && mode === 'longBreak') {
          setTimeLeft(newLength);
        }
        setLongBreakLength(newLength);
        setTimerDefaults(taskLength, breakLength, newLength);
      }
    }
  };

  const increaseTime = (category: string) => {
    if (!timerRunning) {
      if (category === 'task') {
        const newLength = taskLength + 60 * 1000;
        if (taskLength === timeLeft && mode === 'task') {
          setTimeLeft(newLength);
        }
        setTaskLength(taskLength + 60 * 1000);
        setTimerDefaults(newLength, breakLength, longBreakLength);
      } else if (category === 'break') {
        const newLength = breakLength + 60 * 1000;
        if (breakLength === timeLeft && mode === 'break') {
          setTimeLeft(newLength);
        }
        setBreakLength(newLength);
        setTimerDefaults(taskLength, newLength, longBreakLength);
      } else if (category === 'longBreak') {
        const newLength = longBreakLength + 60 * 1000;
        if (longBreakLength === timeLeft && mode === 'longBreak') {
          setTimeLeft(newLength);
        }
        setLongBreakLength(newLength);
        setTimerDefaults(taskLength, breakLength, newLength);
      }
    }
  };

  const indicatorColor =
    Colors.colorScale[40 - Math.round((timeLeft / fullTime) * 40)];

  let completedToday = 0;
  const todayTs = new Date();
  const today = [
    todayTs.getFullYear(),
    todayTs.getMonth(),
    todayTs.getDate(),
  ].join('-');
  for (let i = 0; i < history.length; i++) {
    const checkDate = [
      history[i].timestamp.getFullYear(),
      history[i].timestamp.getMonth(),
      history[i].timestamp.getDate(),
    ].join('-');
    if (today === checkDate) {
      completedToday++;
    }
  }
  const taskWord = completedToday === 1 ? 'Task' : 'Tasks';

  return (
    <SafeAreaView>
      <View style={[Styles.body, {backgroundColor: appBackground}]}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 20,
            height: '20%',
          }}>
          <Text size="XL" bold color={textColor}>
            {mode === 'task'
              ? 'Focus on a Task'
              : mode === 'break'
              ? 'Take a Break'
              : 'Take a Long Break'}
          </Text>
          <Text color={textColor}>
            {completedToday} {taskWord} Completed Today
          </Text>
        </View>
        <SkypeIndicator
          size={deviceWidth * 0.9}
          animationDuration={3000}
          color={indicatorColor}
          animating={timerRunning && timeLeft >= 0}
          hidesWhenStopped={timeLeft === fullTime || timeLeft < 0}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text color={textColor}>{millisecondsToTime(timeLeft)}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              paddingTop: 20,
            }}>
            {timeLeft >= 0 && (
              <Button
                text={
                  timerRunning
                    ? 'Pause'
                    : timeLeft === fullTime
                    ? 'Start'
                    : 'Resume'
                }
                buttonStyle={timerRunning ? 'hollow' : 'primary'}
                onPress={() => toggleTimer()}
                size="Small"
              />
            )}
            {timeLeft < 0 && (
              <Button
                text="Stop"
                buttonStyle={timerRunning ? 'hollow' : 'primary'}
                onPress={() => stopTimer()}
                size="Small"
              />
            )}
            {!timerRunning && timeLeft !== fullTime && (
              <View style={{paddingLeft: 20}}>
                <Button
                  text="Reset"
                  buttonStyle="hollow"
                  onPress={() => resetTimer()}
                  size="Small"
                />
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingBottom: 20,
            height: '20%',
          }}>
          {plusMinusButtonSection(
            'task',
            'Task',
            timerRunning,
            timerRunning || taskLength <= 60 * 1000,
            taskLength / 60 / 1000,
            increaseTime,
            decreaseTime,
          )}
          {plusMinusButtonSection(
            'break',
            'Break',
            timerRunning,
            timerRunning || breakLength <= 60 * 1000,
            breakLength / 60 / 1000,
            increaseTime,
            decreaseTime,
          )}
          {plusMinusButtonSection(
            'longBreak',
            'Long-Break',
            timerRunning,
            timerRunning || longBreakLength <= 60 * 1000,
            longBreakLength / 60 / 1000,
            increaseTime,
            decreaseTime,
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskTwoScreen;
