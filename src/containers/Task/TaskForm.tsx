import {Button} from '@rneui/themed';
import React, {useContext, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import TextBox from '../../components/TextBox';
import {TaskContext} from '../../context/TaskContext';
import {ITaskProps} from '../../interface/TaskInterface';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constant/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';

interface TaskFormProps {
  data?: ITaskProps;
}

const TaskForm = ({data}: TaskFormProps) => {
  const [task, setTask] = React.useState({
    title: '',
    description: '',
  });
  const {tasks, setTasks} = useContext(TaskContext);
  const navigation = useNavigation();

  const addNewTask = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newTask: ITaskProps = {
      id: tasks.length + 1,
      title: task.title,
      description: task.description,
      is_completed: false,
      date: today,
    };
    setTasks(oldTasks => [...oldTasks, newTask]);

    navigation.goBack();
  };

  const updateTask = () => {
    const updatedTask = tasks.filter((item: ITaskProps, index: number) => {
      if (item.id === data?.id) {
        item.title = task.title;
        item.description = task.description;
      }
      return item;
    });
    setTasks(updatedTask);

    navigation.goBack();
  };

  const handleOnPressSubmit = () => {
    if (data) {
      updateTask();
    } else {
      addNewTask();
    }
  };

  useEffect(() => {
    data &&
      setTask({
        title: data.title,
        description: data.description || '',
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{paddingHorizontal: 6}}>
        <View style={{paddingVertical: 20}}>
          <TextBox
            placeholder="Title"
            value={task.title}
            onChangeText={text => setTask({...task, title: text})}
          />
          <TextBox
            placeholder="Description"
            value={task.description}
            onChangeText={text => setTask({...task, description: text})}
            multiline={true}
            numberOfLines={10}
            style={{paddingTop: 14, minHeight: 250}}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <View style={styles.stickyBottomContainer}>
        <Button size="lg" onPress={handleOnPressSubmit}>
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  stickyBottomContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
  },
});
