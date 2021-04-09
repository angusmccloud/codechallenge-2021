import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  TaskOneScreen,
  TaskTwoScreen,
  TaskThreeScreen,
  TaskFourScreen,
  AboutScreen,
} from 'views';
import {Colors} from 'styles';
import { Icon } from 'components';
import { eIcons } from 'models';

const NavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.blueDark,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const TaskOneStack = createStackNavigator();
const TaskTwoStack = createStackNavigator();
const TaskThreeStack = createStackNavigator();
const TaskFourStack = createStackNavigator();
const AboutStack = createStackNavigator();

function TaskOneStackScreen() {
  return (
    <TaskOneStack.Navigator screenOptions={NavOptions}>
      <TaskOneStack.Screen name="Task One - Calculator" component={TaskOneScreen} />
    </TaskOneStack.Navigator>
  );
}

function TaskTwoStackScreen() {
  return (
    <TaskTwoStack.Navigator screenOptions={NavOptions}>
      <TaskTwoStack.Screen name="Task Two" component={TaskTwoScreen} />
    </TaskTwoStack.Navigator>
  );
}

function TaskThreeStackScreen() {
  return (
    <TaskThreeStack.Navigator screenOptions={NavOptions}>
      <TaskThreeStack.Screen name="Task Three" component={TaskThreeScreen} />
    </TaskThreeStack.Navigator>
  );
}

function TaskFourStackScreen() {
  return (
    <TaskFourStack.Navigator screenOptions={NavOptions}>
      <TaskFourStack.Screen name="Task Four" component={TaskFourScreen} />
    </TaskFourStack.Navigator>
  );
}

function AboutStackScreen() {
  return (
    <AboutStack.Navigator screenOptions={NavOptions}>
      <AboutStack.Screen name="About" component={AboutScreen} />
    </AboutStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: eIcons = eIcons.taskOne;

            if (route.name === 'Task 1') {
              iconName = focused ? eIcons.taskOneFocused : eIcons.taskOne;
            } else if (route.name === 'Task 2') {
              iconName = focused ? eIcons.taskTwoFocused : eIcons.taskTwo;
            } else if (route.name === 'Task 3') {
              iconName = focused ? eIcons.taskThreeFocused : eIcons.taskThree;
            } else if (route.name === 'Task 4') {
              iconName = focused ? eIcons.taskFourFocused : eIcons.taskFour;
            } else if (route.name === 'About') {
              iconName = focused ? eIcons.aboutFocused : eIcons.about;
            }

            // You can return any component that you like here!
            return (
              <Icon icon={iconName} iconSize={size} />
            );
          },
        })}>
        <Tab.Screen name="Task 1" component={TaskOneStackScreen} />
        <Tab.Screen name="Task 2" component={TaskTwoStackScreen} />
        <Tab.Screen name="Task 3" component={TaskThreeStackScreen} />
        <Tab.Screen name="Task 4" component={TaskFourStackScreen} />
        <Tab.Screen name="About" component={AboutStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
