import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'components';
import {Colors} from 'styles';
import {eIcons} from 'models';

interface ButtonProps {
  buttonStyle:
    | 'primary'
    | 'secondary'
    | 'hollow'
    | 'tertiary'
    | 'calculatorPrimary'
    | 'calculatorSecondary'
    | 'calculatorSecondaryWide';
  disabled?: boolean;
  activeOpacity?: number;
  text: string;
  size?: 'Large' | 'Small';
  iconName?: eIcons;
  iconSize?: number;
  iconColor?: string;
  onPress: () => void;
  testID?: string;
}

const Button = ({
  buttonStyle,
  disabled,
  activeOpacity,
  text,
  size,
  iconName,
  iconSize,
  iconColor,
  onPress,
  testID,
}: ButtonProps): React.ReactElement => {
  // Default everything to match Primary with Size Large
  let textColor = disabled ? Colors.buttonDisabledText : Colors.white;
  let backgroundColor = disabled
    ? Colors.buttonDisabledBackground
    : Colors.buttonPrimaryBackground;
  let borderWidth = 0;
  let borderColor = Colors.buttonHollowBorder;
  let borderRadius = 6;
  let shadowRadius = 2;
  let shadowOffset = {width: 0, height: 2};
  let shadowOpacity = 0.4;
  let paddingVertical = size === 'Small' ? 10 : 14;
  let paddingHorizontal = size === 'Small' ? 20 : 28;
  let minWidth = '1%';
  // These 3 are currently consistent on all buttons, adjust if needed
  const textSize = size === 'Small' ? 'S' : 'M';
  const textBold = true;
  const shadowColor = Colors.borderShadow;

  if (buttonStyle === 'secondary') {
    textColor = disabled
      ? Colors.buttonSecondaryDisabledText
      : Colors.buttonSecondaryText;
    backgroundColor = Colors.buttonSecondaryBackground;
  } else if (buttonStyle === 'hollow') {
    textColor = disabled
      ? Colors.buttonHollowDisabledText
      : Colors.buttonHollowText;
    backgroundColor = Colors.buttonHollowBackground;
    borderWidth = disabled ? 0 : 1;
  } else if (buttonStyle === 'tertiary') {
    borderRadius = 0;
    shadowRadius = 0;
    shadowOpacity = 0;
    shadowOffset = {width: 0, height: 0};
    textColor = disabled
      ? Colors.buttonSecondaryDisabledText
      : Colors.buttonSecondaryText;
    backgroundColor = 'rgba(0, 0, 0, 0)'; // Transparent background
  } else if (buttonStyle === 'calculatorPrimary') {
    minWidth = '20%';
    paddingHorizontal = 20;
  } else if (buttonStyle === 'calculatorSecondary') {
    minWidth = '20%';
    paddingHorizontal = 20;
    textColor = disabled
      ? Colors.buttonHollowDisabledText
      : Colors.buttonHollowText;
    backgroundColor = Colors.buttonHollowBackground;
    borderWidth = disabled ? 0 : 1;
  } else if (buttonStyle === 'calculatorSecondaryWide') {
    minWidth = '44%';
    paddingHorizontal = 20;
    textColor = disabled
      ? Colors.buttonHollowDisabledText
      : Colors.buttonHollowText;
    backgroundColor = Colors.buttonHollowBackground;
    borderWidth = disabled ? 0 : 1;
  }

  const pressHandler = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={() => pressHandler()}
      testID={testID}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor,
          borderWidth,
          borderColor,
          borderRadius,
          shadowColor,
          shadowOpacity,
          shadowOffset,
          shadowRadius,
          margin: 2,
          paddingTop: paddingVertical,
          paddingBottom: paddingVertical,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          minWidth,
          flexDirection: 'row',
        }}>
        {iconName !== undefined && (
          <Icon
            icon={iconName}
            iconSize={iconSize}
            containerStyle={{paddingRight: text.length > 0 ? 5 : 0}}
            color={iconColor}
          />
        )}
        <Text size={textSize} bold={textBold} color={textColor}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  disabled: false,
  activeOpacity: 0.8,
  testID: '',
  size: 'Large',
  iconName: undefined,
  iconSize: 16,
  iconColor: Colors.buttonPrimaryBackground,
};

export default Button;
