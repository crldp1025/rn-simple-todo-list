import React from 'react'
import { Animated, ScrollView, StyleSheet, View } from 'react-native'
import { ITaskProps } from '../interface/TaskInterface'
import { Text } from '@rneui/themed'
import colors from '../constant/Colors'
import AnimatedButton from '../components/AnimatedButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const TaskDetailsScreen = ({ route, navigation }: any) => {
  const [task, setTask] = React.useState<ITaskProps>(route.params)
  const [itemColorAnimation] = React.useState<Animated.Value>(new Animated.Value((task.is_completed) ? 1 : 0));
  const setItemColorAnimation = (is_completed: boolean) => {
    Animated.timing(itemColorAnimation, {
      toValue: (is_completed) ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start(); 
  }

  const handleOnPressComplete = () => {
    setItemColorAnimation(!task.is_completed)
    setTask({...task, is_completed: !task.is_completed})
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView>
        <View style={{padding: 16}}>
          <Text h3 style={{marginBottom: 20}}>{task?.title}</Text>
          <View>
            <Text style={{fontSize: 16}}>{task?.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.stickyBottomContainer}>
        <View style={styles.stickyBottomButtonContainer}>
          <AnimatedButton
            defaultBgColor={colors.lightGray}
            resultBgColor={colors.green}
            animationState={itemColorAnimation}
            handleOnPress={() => handleOnPressComplete()}
          >
            <Text style={[styles.stickyBottomButtonText]}>
              Complete
            </Text>
          </AnimatedButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default TaskDetailsScreen

const styles = StyleSheet.create({
  stickyBottomContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: colors.lightGray
  },
  stickyBottomButtonContainer: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  stickyBottomButtonText: {
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 18,
    color: colors.white
  }
})