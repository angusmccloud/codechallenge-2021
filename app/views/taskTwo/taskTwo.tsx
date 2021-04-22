import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Icon} from 'components';
import {SkypeIndicator} from 'react-native-indicators';
import {eIcons} from 'models';
import {Styles, Colors, Typography} from 'styles';
import {getTimerDefaults, setTimerDefaults} from 'utils';

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

  const loadDefaultTimes = async () => {
    const times = await getTimerDefaults();
    setTaskLength(times.task);
    setBreakLength(times.break);
    setLongBreakLength(times.longBreak);
    setEndTime(new Date().getTime() + times.task);
    setTimeLeft(times.task);
  };

  useEffect(() => {
    loadDefaultTimes();
    // Reanimated v2 still displays this warning sometimes even when the option is set, hiding it
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const fullTime =
    mode === 'task'
      ? taskLength
      : mode === 'break'
      ? breakLength
      : longBreakLength;

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
    }

    setTimeLeft(newTimeLeft);
    setMode(newMode);
  };

  const resetTimer = () => {
    setTimeLeft(fullTime);
  };

  const millisecondsToTime = (milliseconds: number): string => {
    const totalSeconds = Math.abs(milliseconds / 1000);
    let seconds = Math.round(totalSeconds % 60);
    let minutes = Math.floor(totalSeconds / 60);
    if (seconds === 60) {
      // Account for 59.99 seconds, etc...
      seconds = 0;
      minutes++;
    }
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const decreaseTime = (time: 'task' | 'break' | 'longBreak') => {
    if (!timerRunning) {
      if (time === 'task') {
        const newLength =
          taskLength > 60 * 1000 ? taskLength - 60 * 1000 : taskLength;
        if (taskLength === timeLeft && mode === 'task') {
          setTimeLeft(newLength);
        }
        setTaskLength(newLength);
        setTimerDefaults(newLength, breakLength, longBreakLength);
      } else if (time === 'break') {
        const newLength =
          breakLength > 60 * 1000 ? breakLength - 60 * 1000 : breakLength;
        if (breakLength === timeLeft && mode === 'break') {
          setTimeLeft(newLength);
        }
        setBreakLength(newLength);
        setTimerDefaults(taskLength, newLength, longBreakLength);
      } else {
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

  const increaseTime = (time: 'task' | 'break' | 'longBreak') => {
    if (!timerRunning) {
      if (time === 'task') {
        const newLength = taskLength + 60 * 1000;
        if (taskLength === timeLeft && mode === 'task') {
          setTimeLeft(newLength);
        }
        setTaskLength(taskLength + 60 * 1000);
        setTimerDefaults(newLength, breakLength, longBreakLength);
      } else if (time === 'break') {
        const newLength = breakLength + 60 * 1000;
        if (breakLength === timeLeft && mode === 'break') {
          setTimeLeft(newLength);
        }
        setBreakLength(newLength);
        setTimerDefaults(taskLength, newLength, longBreakLength);
      } else {
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
                text={'Stop'}
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
          <View>
            <View style={{alignItems: 'center'}}>
              <Text size="S" bold>
                Tasks
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                overflow: 'hidden',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Colors.buttonPrimaryBackground,
                backgroundColor: timerRunning
                  ? Colors.grayLight
                  : Colors.buttonPrimaryBackground,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 4,
                  paddingRight: 4,
                  backgroundColor:
                    timerRunning || taskLength === 60 * 1000
                      ? Colors.grayLight
                      : Colors.buttonPrimaryBackground,
                }}
                onPress={() => decreaseTime('task')}>
                <Icon
                  icon={eIcons.minus}
                  color={Colors.white}
                  iconSize={Typography.fontSizeXL}
                />
              </TouchableOpacity>
              <View
                style={{
                  // flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.white,
                  padding: 10,
                }}>
                <Text size="S" bold>
                  {taskLength / 60 / 1000}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                onPress={() => increaseTime('task')}>
                <Icon
                  icon={eIcons.plus}
                  color={Colors.white}
                  iconSize={Typography.fontSizeXL}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{alignItems: 'center'}}>
              <Text size="S" bold>
                Breaks
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                overflow: 'hidden',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Colors.buttonPrimaryBackground,
                backgroundColor: timerRunning
                  ? Colors.grayLight
                  : Colors.buttonPrimaryBackground,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 4,
                  paddingRight: 4,
                  backgroundColor:
                    timerRunning || breakLength === 60 * 1000
                      ? Colors.grayLight
                      : Colors.buttonPrimaryBackground,
                }}
                onPress={() => decreaseTime('break')}>
                <Icon
                  icon={eIcons.minus}
                  color={Colors.white}
                  iconSize={Typography.fontSizeXL}
                />
              </TouchableOpacity>
              <View
                style={{
                  // flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.white,
                  padding: 10,
                }}>
                <Text size="S" bold>
                  {breakLength / 60 / 1000}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                onPress={() => increaseTime('break')}>
                <Icon
                  icon={eIcons.plus}
                  color={Colors.white}
                  iconSize={Typography.fontSizeXL}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{alignItems: 'center'}}>
              <Text size="S" bold>
                Long-Breaks
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                overflow: 'hidden',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Colors.buttonPrimaryBackground,
                backgroundColor: timerRunning
                  ? Colors.grayLight
                  : Colors.buttonPrimaryBackground,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 4,
                  paddingRight: 4,
                  backgroundColor:
                    timerRunning || longBreakLength === 60 * 1000
                      ? Colors.grayLight
                      : Colors.buttonPrimaryBackground,
                }}
                onPress={() => decreaseTime('longBreak')}>
                <Icon
                  icon={eIcons.minus}
                  color={Colors.white}
                  iconSize={Typography.fontSizeXL}
                />
              </TouchableOpacity>
              <View
                style={{
                  // flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.white,
                  padding: 10,
                }}>
                <Text size="S" bold>
                  {longBreakLength / 60 / 1000}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                onPress={() => increaseTime('longBreak')}>
                <Icon
                  icon={eIcons.plus}
                  color={Colors.white}
                  iconSize={Typography.fontSizeXL}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskTwoScreen;
