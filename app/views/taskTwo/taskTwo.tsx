import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Dimensions} from 'react-native';
import {Text, Button } from 'components';
import { MaterialIndicator } from 'react-native-indicators';
import {Styles} from 'styles';

const deviceWidth = Dimensions.get('window').width;

const colorScale = [
  '#0A2F51',
  '#0E4D64',
  '#137177',
  '#188977',
  '#1D9A6C',
  '#39A96B',
  '#56B870',
  '#74C67A',
  '#99D492',
  '#BFE1B0',
  '#BFE1B0'
];

const TaskTwoScreen = ({route, navigation}): React.ReactElement => {
  // const defaultTask = 25 * 1000 * 60;
  // const defaultBreak = 5 * 1000 * 60;
  // const defaultLongBreak = 25 * 1000 * 60;
  const defaultTask = .2 * 1000 * 60;
  const defaultBreak = .1 * 1000 * 60;
  const defaultLongBreak = .3 * 1000 * 60;
  const [taskLength, setTaskLegnth] = useState(defaultTask);
  const [breakLength, setBreakLength] = useState(defaultBreak);
  const [longBreakLength, setLongBreakLength] = useState(defaultLongBreak);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerHasStarted, setTimerHasStarted] = useState(false);
  const [color, setColor] = useState(colorScale[0]);
  const [mode, setMode] = useState('task');
  const [timeLeft, setTimeLeft] = useState(defaultTask);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [fullTime, setFullTime] = useState(defaultTask);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(timerRunning) {
        if(timeLeft < 1000) {
          setTimeLeft(mode === 'task' ? breakLength : taskLength);
          setFullTime(timeLeft);
          setTimerRunning(false);
          setTimerHasStarted(false);
          setMode(mode === 'task' ? 'break' : 'task');
          setColor(colorScale[0]);
        } else {
          setTimeLeft(timeLeft - 1000);
          const totalTime = mode === 'task' ? taskLength : mode === 'break' ? breakLength : longBreakLength;
          setColor(colorScale[10 - Math.round((timeLeft / totalTime) * 10)]);
        }
      }
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
    setTimerHasStarted(true);
  }

  const resetTimer = () => {
    setTimeLeft(mode === 'task' ? taskLength : mode === 'break' ? breakLength : longBreakLength);
  }

  const millisecondsToTime = (milli: number): string => {
    const totalSeconds = milli / 1000;
    const seconds = Math.round(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <SafeAreaView>
      <View style={Styles.body}>
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20}}>
          <Text size='XL' bold>
            {mode === 'task' ? 'Focus on a Task' : mode === 'break' ? 'Take a Break' : 'Take a Long Break'}
          </Text>
        </View>
        <MaterialIndicator size={deviceWidth * .9} color={color} animationDuration={10000} animating={timerRunning} hidesWhenStopped={!timerHasStarted} />
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            {millisecondsToTime(timeLeft)}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingTop: 20}}>
            <Button text={timerRunning ? 'Pause' : 'Start'} buttonStyle={timerRunning ? 'hollow' : 'primary'} onPress={() => toggleTimer()} size='Small' />
            {(!timerRunning && timeLeft !== fullTime) && (
              <View style={{paddingLeft: 20}}>
                <Button text='Reset' buttonStyle='hollow' onPress={() => resetTimer()} size='Small' />
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskTwoScreen;
