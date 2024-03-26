import React from 'react';
import {SafeAreaView} from 'react-native';
import TaskList from '../../containers/Task/TaskList';
import colors from '../../constant/Colors';

const HomeScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <TaskList navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;
