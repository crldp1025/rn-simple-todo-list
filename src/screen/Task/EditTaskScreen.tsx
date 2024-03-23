import React from 'react';
import TaskForm from '../../containers/Task/TaskForm';

const EditTaskScreen = ({route}: any) => {
  return (
    <>
      <TaskForm data={route.params} />
    </>
  );
};

export default EditTaskScreen;
