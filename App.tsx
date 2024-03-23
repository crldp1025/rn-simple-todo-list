import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, ThemeProvider} from '@rneui/themed';
import TaskDetailsScreen from './src/screen/Task/TaskDetailsScreen';
import HomeScreen from './src/screen/Home/HomeScreen';
import colors from './src/constant/Colors';
import AddTaskScreen from './src/screen/Task/AddTaskScreen';
import TaskProvider from './src/context/TaskContext';
import EditTaskScreen from './src/screen/Task/EditTaskScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerStyle: {backgroundColor: colors.blue},
              headerTitleStyle: {color: colors.white},
              headerTintColor: colors.white,
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation, route}) => ({
                title: 'To Do List',
                headerRight: () => (
                  <Button
                    icon={{name: 'add', color: colors.white}}
                    buttonStyle={{backgroundColor: 'transparent'}}
                    onPress={() => navigation.navigate('AddTask')}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="TaskDetails"
              component={TaskDetailsScreen}
              options={({navigation, route}) => ({
                title: 'Task',
                headerRight: () => (
                  <Button
                    icon={{name: 'edit', color: colors.white}}
                    buttonStyle={{backgroundColor: 'transparent'}}
                    onPress={() =>
                      navigation.navigate('EditTask', route.params)
                    }
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{
                title: 'Add Task',
              }}
            />
            <Stack.Screen
              name="EditTask"
              component={EditTaskScreen}
              options={{
                title: 'Edit Task',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
