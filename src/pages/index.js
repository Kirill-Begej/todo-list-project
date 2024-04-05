import 'normalize.css';
import './index.scss';
import Theme from '../components/Theme';
import Section from '../components/Section';
import Task from '../components/Task';
import * as constants from '../utils/constants';
import { checkTheme, setTheme } from '../utils/theme';
import PopupAddTask from '../components/PopupAddTask';

const theme = new Theme({ setTheme, checkTheme }, constants.buttonTheme);

theme.enableTheme();

const addTask = (item) => {
  const task = new Task({ text: item }, constants.taskTemplate);
  const taskElement = task.generate();
  return taskElement;
};

const toDoTasksList = new Section(
  {
    keyInLocalStorage: 'toDo',
    renderer: (taskText) => {
      toDoTasksList.setTask(addTask(taskText), taskText);
    },
  },
  constants.toDoTaskSection,
);

toDoTasksList.setAppLoadListener();

const inProgressTaskList = new Section(
  {
    keyInLocalStorage: 'inProgress',
    renderer: (taskText) => {
      inProgressTaskList.setTask(addTask(taskText), taskText);
    },
  },
  constants.inProgressTaskSection,
);

inProgressTaskList.setAppLoadListener();

const doneTaskList = new Section(
  {
    keyInLocalStorage: 'done',
    renderer: (taskText) => {
      doneTaskList.setTask(addTask(taskText), taskText);
    },
  },
  constants.doneTaskSection,
);

doneTaskList.setAppLoadListener();

const popupAddTask = new PopupAddTask(
  {
    handleSubmit: (taskText) => {
      toDoTasksList.setTask(addTask(taskText), taskText);
      popupAddTask.close();
    },
  },
  constants.popupAddTask,
);

constants.buttonAddTask.addEventListener('click', () => {
  popupAddTask.open();
});
