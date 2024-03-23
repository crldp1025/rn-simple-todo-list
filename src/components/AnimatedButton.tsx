import React from 'react';
import {
  Animated,
  StyleProp,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../constant/Colors';

interface IAnimatedProps {
  defaultBgColor: string;
  resultBgColor: string;
  animationState: Animated.Value;
  handleOnPress?: (data: any) => void | any;
  containerStyles?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const AnimatedButton = ({
  defaultBgColor,
  resultBgColor,
  animationState,
  handleOnPress = () => {},
  containerStyles,
  children,
}: IAnimatedProps) => {
  return (
    <TouchableHighlight
      onPress={handleOnPress}
      activeOpacity={0.6}
      underlayColor={colors.gray}>
      <View
        style={[
          containerStyles,
          {
            backgroundColor: defaultBgColor,
            overflow: 'hidden',
          },
        ]}>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            paddingVertical: 10,
            backgroundColor: animationState.interpolate({
              inputRange: [0, 1],
              outputRange: [defaultBgColor, resultBgColor],
            }),
            left: animationState.interpolate({
              inputRange: [0, 1],
              outputRange: ['-100%', '0%'],
            }),
          }}></Animated.View>
        {children}
      </View>
    </TouchableHighlight>
  );
};

export default AnimatedButton;
