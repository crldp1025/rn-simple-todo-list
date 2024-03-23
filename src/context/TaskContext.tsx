import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import {ITaskProps} from '../interface/TaskInterface';

export interface TaskContextInterface {
  tasks: ITaskProps[];
  setTasks: Dispatch<SetStateAction<ITaskProps[]>>;
}

const defaultState = {
  tasks: [],
  setTasks: (tasks: ITaskProps[]) => {},
} as TaskContextInterface;

export const TaskContext = createContext(defaultState);

interface TaskProviderProps {
  children?: ReactNode;
}

const TaskProvider = ({children}: TaskProviderProps) => {
  const [tasks, setTasks] = useState<ITaskProps[]>([]);

  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
