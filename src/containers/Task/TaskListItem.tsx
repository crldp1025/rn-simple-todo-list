import {CheckBox} from '@rneui/themed';
import React from 'react';
import {ITaskProps} from '../../interface/TaskInterface';
import {Animated, StyleSheet, TouchableHighlight, View} from 'react-native';
import colors from '../../constant/Colors';
import AnimatedButton from '../../components/AnimatedButton';

interface ITaskListItemProps {
  task: ITaskProps;
  handleItemOnPress?: (task: ITaskProps) => void | any;
  handleCheckbox?: (task: ITaskProps) => void;
}

const TaskListItem = ({
  task,
  handleItemOnPress = () => {},
  handleCheckbox = () => {},
}: ITaskListItemProps) => {
  const [taskItemColorAnimation] = React.useState<Animated.Value>(
    new Animated.Value(task.is_completed ? 1 : 0),
  );
  const setTaskItemColorAnimation = (is_completed: boolean) => {
    Animated.timing(taskItemColorAnimation, {
      toValue: is_completed ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <AnimatedButton
      defaultBgColor={colors.white}
      resultBgColor={colors.green}
      animationState={taskItemColorAnimation}
      handleOnPress={() => handleItemOnPress(task)}
      containerStyles={{
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <CheckBox
          iconType="font-awesome"
          checkedIcon="check-square-o"
          uncheckedIcon="square-o"
          checkedColor={colors.white}
          checked={task.is_completed}
          containerStyle={{backgroundColor: 'transparent'}}
          wrapperStyle={{width: 20}}
          onPress={() => {
            handleCheckbox(task);
            setTaskItemColorAnimation(!task.is_completed);
          }}
        />
        <Animated.Text
          style={{
            fontSize: 18,
            color: taskItemColorAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.darkGray, colors.white],
            }),
          }}>
          {task.title}
        </Animated.Text>
      </View>
    </AnimatedButton>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  isComplete: {
    backgroundColor: colors.green,
  },
  isCompleteTextColor: {
    color: colors.white,
  },
});
