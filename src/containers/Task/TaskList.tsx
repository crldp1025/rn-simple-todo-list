import React, {useContext, useEffect, useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ITaskProps} from '../../interface/TaskInterface';
import Task from '../../constant/Task';
import {Dialog, Icon, Input, Text} from '@rneui/themed';
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
  const [displayTasks, setDisplayTasks] = useState<ITaskProps[]>([]);
  const [searchTask, setSearchTask] = useState<string>();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false); // For android devices
  const [selectedTask, setSelectedTask] = useState<ITaskProps | null>(null); // For android devices

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
          title: 'Are you sure you want to delete this task?',
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
      setSelectedTask(task);
      setIsDialogVisible(true);
    }
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
    setSelectedTask(null);
  };

  const deleteItem = (task: ITaskProps) => {
    let updatedTasks = tasks.filter((item, index) => {
      return item.id !== task.id;
    });

    setTasks(updatedTasks);
  };

  const clearSearchText = () => {
    setSearchTask('');
  };

  const goToTaskDetails = (item: ITaskProps) => {
    navigation.navigate('TaskDetails', item);
  };

  const searchTaskFn = () => {
    const result = tasks.filter(item => {
      return (
        searchTask !== undefined &&
        (item.title.includes(searchTask) ||
          item.description?.includes(searchTask))
      );
    });

    if (result) {
      setDisplayTasks(result);
    }
  };

  useEffect(() => {
    setTasks(Task);
  }, []);

  useEffect(() => {
    setDisplayTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    let delayBounceFn: any = null;
    if (searchTask !== undefined) {
      delayBounceFn = setTimeout(() => {
        searchTaskFn();
      }, 2000);
    }
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
          onChangeText={text => {
            setSearchTask(text);
          }}
          rightIcon={
            <>
              {searchTask && (
                <Icon
                  type="AntDesign"
                  name="close"
                  Component={TouchableOpacity}
                  onPress={clearSearchText}
                />
              )}
            </>
          }
          rightIconContainerStyle={{position: 'absolute', right: 5}}
        />

        {displayTasks !== undefined && (
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
                onLongPress={() => handleOnPressDeleteItem(item)}
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
            disableLeftSwipe={Platform.OS === 'android'}
            closeOnRowBeginSwipe={true}
            scrollEnabled={false}
          />
        )}
        {displayTasks.length === 0 && (
          <View style={{paddingHorizontal: 16, paddingVertical: 20}}>
            <Text style={{textAlign: 'center', fontSize: 16}}>
              No results found.
            </Text>
          </View>
        )}
      </ScrollView>

      {Platform.OS === 'android' && (
        <Dialog
          isVisible={isDialogVisible}
          onBackdropPress={() => setIsDialogVisible(!isDialogVisible)}>
          <Dialog.Title
            title="Are you sure you want to delete this task?"
            titleStyle={{color: colors.black}}
          />
          <Dialog.Actions>
            <Dialog.Button
              title="Delete"
              onPress={() => {
                selectedTask !== null && deleteItem(selectedTask);
              }}
            />
            <Dialog.Button title="Cancel" onPress={closeDialog} />
          </Dialog.Actions>
        </Dialog>
      )}
    </View>
  );
};

export default TaskList;
