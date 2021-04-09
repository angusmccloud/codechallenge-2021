import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'components';
import {Colors} from 'styles';

interface ButtonProps {
  buttonStyle: 'primary' | 'secondary' | 'hollow';
  disabled?: boolean;
  activeOpacity?: number;
  text: string;
  size?: 'Large' | 'Small';
  onPress: () => void;
  testID?: string;
}

const Button = ({
  buttonStyle,
  disabled,
  activeOpacity,
  text,
  size,
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
  // These 5 are currently consistent on all buttons, adjust if needed
  const textSize = size === 'Small' ? 'XS' : 'S';
  const padding = size === 'Small' ? 10 : 14;
  const textBold = true;
  const borderRadius = 6;
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
    borderWidth = 1;
  }

  if (disabled) {
    textColor = Colors.buttonDisabledText;
    backgroundColor = Colors.buttonDisabledBackground;
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
          shadowOpacity: 0.4,
          shadowOffset: {width: 0, height: 1},
          shadowRadius: 2,
          margin: 2,
          paddingTop: padding,
          paddingBottom: padding,
          paddingLeft: padding * 2,
          paddingRight: padding * 2,
        }}>
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
};

export default Button;
