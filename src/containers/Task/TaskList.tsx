import React, {useContext, useEffect, useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ITaskProps} from '../../interface/TaskInterface';
import Task from '../../constant/Task';
import {Button, Icon, Input, Text} from '@rneui/themed';
import TaskListItem from './TaskListItem';
import {
  ActionSheetIOS,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import SwipeListButton from '../../components/SwipeListButton';
import colors from '../../constant/Colors';
import {TaskContext} from '../../context/TaskContext';

interface TaskListProps {
  navigation?: any;
}

const TaskList = ({navigation}: TaskListProps) => {
  const {tasks, setTasks} = useContext(TaskContext);
  const [displayTasks, setDisplayTasks] = useState<ITaskProps[]>();
  const [searchTask, setSearchTask] = useState<string>('');

  const handleCheckbox = (task: ITaskProps) => {
    let updatedTasks = tasks.map(item => {
      if (item.id === task.id) {
        return {...item, is_completed: !task.is_completed};
      }
      return item;
    });

    setTasks(updatedTasks);
  };

  const handleOnPressDeleteItem = (task: ITaskProps) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Delete'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          title: 'This task will be deleted.',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // Cancel action
          } else if (buttonIndex === 1) {
            deleteItem(task);
          }
        },
      );
    } else {
      console.log('Android');
    }
  };

  const deleteItem = (task: ITaskProps) => {
    let updatedTasks = tasks.filter((item, index) => {
      return item.id !== task.id;
    });

    setTasks(updatedTasks);
  };

  const goToTaskDetails = (item: ITaskProps) => {
    navigation.navigate('TaskDetails', item);
  };

  const searchTaskFn = () => {
    const result = tasks.filter(item => {
      return (
        item.title.includes(searchTask) ||
        item.description?.includes(searchTask)
      );
    });

    if (result) {
      setDisplayTasks(result);
    }
    console.log(result);
  };

  useEffect(() => {
    setTasks(Task);
  }, []);

  useEffect(() => {
    setDisplayTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const delayBounceFn = setTimeout(() => {
      searchTaskFn();
    }, 2000);

    return () => clearTimeout(delayBounceFn);
  }, [searchTask]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <Input
          placeholder="Search..."
          inputStyle={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderRadius: 10,
          }}
          inputContainerStyle={{
            borderColor: 'transparent',
          }}
          containerStyle={{
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            paddingTop: 25,
          }}
          autoComplete="off"
          value={searchTask}
          onChangeText={text => setSearchTask(text)}
          rightIcon={
            <>
              {searchTask && (
                <Icon
                  type="AntDesign"
                  name="close"
                  Component={TouchableOpacity}
                  onPress={() => console.log('test')}
                />
              )}
            </>
          }
          rightIconContainerStyle={{position: 'absolute', right: 5}}
        />
        {displayTasks && (
          <SwipeListView
            useFlatList={true}
            data={displayTasks}
            keyExtractor={item => item.id.toString()}
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
                  icon={{name: 'delete', color: 'white'}}
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
            scrollEnabled={false}
          />
        )}
        {(displayTasks === undefined || displayTasks.length) === 0 && (
          <View style={{paddingHorizontal: 16, paddingVertical: 20}}>
            <Text style={{textAlign: 'center', fontSize: 16}}>
              No results found.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TaskList;
