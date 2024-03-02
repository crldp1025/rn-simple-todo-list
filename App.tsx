import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, ThemeProvider } from '@rneui/themed';
import TaskDetailsScreen from './src/screen/TaskDetailsScreen';
import HomeScreen from './src/screen/HomeScreen';
import colors from './src/constant/Colors';
import AddTaskScreen from './src/screen/AddTask/AddTaskScreen';

const Stack = createNativeStackNavigator()

const App = () =>  {

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.blue},
            headerTitleStyle: {color: colors.white},
            headerTintColor: colors.white
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={({navigation, route}) => ({
              title: 'To Do List',
              headerRight: () => (
                <Button
                  icon={{ name: 'add', color: colors.white }}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  onPress={() => navigation.navigate('AddTask')}
                />
              )
            })}
          />
          <Stack.Screen 
            name="TaskDetails" 
            component={TaskDetailsScreen} 
            options={{
              title: 'Task',
              headerRight: () => (
                <Button
                  icon={{ name: 'edit', color: colors.white }}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  onPress={() => console.log('edit')}
                />
              )
            }}
          />
          <Stack.Screen 
            name="AddTask" 
            component={AddTaskScreen} 
            options={{
              title: 'Add Task'
              // headerRight: () => (
              //   <Button
              //     icon={{ name: 'edit', color: colors.blue }}
              //     buttonStyle={{backgroundColor: colors.white}}
              //     onPress={() => console.log('edit')}
              //   />
              // )
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
