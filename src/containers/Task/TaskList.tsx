import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { ITaskProps } from '../../interface/TaskInterface'
import Task from '../../constant/Task'
import { Button, Input } from '@rneui/themed'
import TaskListItem from './TaskListItem'
import { ActionSheetIOS, Platform, StyleSheet, View } from 'react-native'
import ItemSeparator from '../../components/ItemSeparator'
import SwipeListButton from '../../components/SwipeListButton'
import colors from '../../constant/Colors'

interface TaskListProps {
  navigation?: any
}

const TaskList = ({navigation}: TaskListProps) => {
  const [tasks, setTasks] = React.useState<ITaskProps[]>(Task)

  const handleCheckbox = (task: ITaskProps) => {
    let updatedTasks = tasks.map((item, index) => {
      if(item.id === task.id) {
        return {...item, is_completed: !task.is_completed}
      }

      return item;
    })
    
    setTasks(updatedTasks)
  }

  const handleOnPressDeleteItem = (task: ITaskProps) => {
    if(Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Delete'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          title: 'This task will be deleted.'
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // Cancel action
          } else if (buttonIndex === 1) {
            deleteItem(task)
          }
        },
      );
    } else {
      console.log('Android')
    }
  }

  const deleteItem = (task: ITaskProps) => {
    let updatedTasks = tasks.filter((item, index) => {
      return item.id !== task.id
    })
    
    setTasks(updatedTasks)
  }

  const goToTaskDetails = (item: ITaskProps) => {
    navigation.navigate('TaskDetails', item)
  }

  return (
    <View style={{
      flex: 1
    }}>
      <SwipeListView
        useFlatList={true}
        data={tasks}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={() => 
          <View>
            <Input 
              placeholder='Search...' 
              inputStyle={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 10
              }}
              inputContainerStyle={{
                borderColor: 'transparent'
              }}
              containerStyle={{
                borderBottomWidth: 1,
                borderColor: 'rgba(0,0,0,0.1)',
                paddingTop: 25
              }}
            />
          </View>
        }
        renderItem={({item, index}) => (
          <TaskListItem
            key={index}
            task={item} 
            handleItemOnPress={() => goToTaskDetails(item)} 
            handleCheckbox={() => handleCheckbox(item)}
          />
        )}
        renderHiddenItem={(data, rowMap) => (
          <View>
            <SwipeListButton 
              icon={{ name: 'delete', color: 'white' }}
              position="right"
              btnColor={colors.red}
              handleOnPress={() => handleOnPressDeleteItem(data.item)}
            />
          </View>
        )}
        rightOpenValue={-100}
        swipeToOpenPercent={40}
        disableRightSwipe={true}
        closeOnRowBeginSwipe={true}
      />
    </View>
  )
}

export default TaskList