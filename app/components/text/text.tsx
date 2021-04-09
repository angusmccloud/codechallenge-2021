import React from 'react';
import {Text as RNText, TextStyle} from 'react-native';
import {Typography, Colors} from 'styles';

export interface TextProps {
  size?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  style?: TextStyle;
  bold?: boolean;
  color?: string;
  children: React.ReactNode;
}

const Text = ({
  size = 'M',
  children,
  style,
  bold,
  color,
  ...rest
}: TextProps): React.ReactElement => (
  <RNText
    {...rest}
    allowFontScaling={false}
    style={{
      ...style,
      fontSize: getSize(size),
      fontFamily: bold
        ? Typography.fontFamilyBold
        : Typography.fontFamilyRegular,
      fontWeight: bold
        ? Typography.fontWeightBold
        : Typography.fontWeightRegular,
      color,
    }}>
    {children}
  </RNText>
);

Text.defaultProps = {
  color: Colors.textDefault,
  bold: false,
  size: 'M',
};

const getSize = (size: string): number => {
  switch (size) {
    case 'XXS':
      return Typography.fontSizeXXS;
    case 'XS':
      return Typography.fontSizeXS;
    case 'S':
      return Typography.fontSizeS;
    case 'M':
      return Typography.fontSizeM;
    case 'L':
      return Typography.fontSizeL;
    case 'XL':
      return Typography.fontSizeXL;
    case 'XXL':
      return Typography.fontSizeXXL;
    default:
      return Typography.fontSizeM;
  }
};

export default Text;
