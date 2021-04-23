import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Colors, Styles} from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {eIcons} from 'models';

export interface IconProps {
  icon: eIcons;
  iconSize?: number;
  containerStyle?: ViewStyle;
  color?: string;
}

const Icon = ({
  icon,
  iconSize,
  containerStyle,
  color,
}: IconProps): React.ReactElement => (
  <View
    style={[
      {
        ...containerStyle,
        overflow: 'hidden',
      },
      Styles.centerAll,
    ]}>
    <Ionicons name={iconName(icon)} size={iconSize} color={color} />
  </View>
);

Icon.defaultProps = {
  color: Colors.blueDark,
  iconSize: 50,
  outline: true,
};

const iconName = (name: eIcons) => {
  switch (name) {
    case eIcons.taskOne:
      return 'calculator-outline';
    case eIcons.taskOneFocused:
      return 'calculator';
    case eIcons.taskTwo:
      return 'timer-outline';
    case eIcons.taskTwoFocused:
      return 'timer';
    case eIcons.taskThree:
      return 'bar-chart-outline';
    case eIcons.taskThreeFocused:
      return 'bar-chart';
    case eIcons.taskFour:
      return 'american-football-outline';
    case eIcons.taskFourFocused:
      return 'american-football';
    case eIcons.about:
      return 'person-outline';
    case eIcons.aboutFocused:
      return 'person';
    case eIcons.backspace:
      return 'backspace-outline';
    case eIcons.plus:
      return 'add-outline';
    case eIcons.minus:
      return 'remove-outline';
    default:
      return 'home';
  }
};

export default Icon;
