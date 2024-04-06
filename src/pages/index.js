import 'normalize.css';
import './index.scss';
import Theme from '../components/Theme';
import Section from '../components/Section';
import Task from '../components/Task';
import TaskInProgress from '../components/TaskInProgress';
import TaskDone from '../components/TaskDone';
import * as constants from '../utils/constants';
import { checkTheme, setTheme } from '../utils/theme';
import PopupAddTask from '../components/PopupAddTask';
import PopupEditTask from '../components/PopupEditTask';

const tasksLists = {};

const theme = new Theme({ setTheme, checkTheme }, constants.buttonTheme);

const addTask = (item) => {
  const task = new Task(
    {
      text: item,
      editTask: (taskText, taskElement) => {
        popupEditTask.open(taskText, taskElement);
      },
      deleteTask: (taskText, taskElement) => {
        tasksLists.toDoTasksList.deleteTask(taskText, taskElement);
      },
      inProgressTask: (taskText, taskElement) => {
        tasksLists.toDoTasksList.deleteTask(taskText, taskElement);
        tasksLists.inProgressTasksList.setTask(addTaskInProgress(taskText), taskText);
      },
      doneTask: (taskText, taskElement) => {
        tasksLists.toDoTasksList.deleteTask(taskText, taskElement);
        tasksLists.doneTasksList.setTask(addTaskDone(taskText), taskText);
      },
    },
    constants.taskTemplate,
  );
  const taskElement = task.generate();
  return taskElement;
};

const addTaskInProgress = (item) => {
  const task = new TaskInProgress(
    {
      text: item,
      editTask: (taskText, taskElement) => {
        popupEditTask.open(taskText, taskElement);
      },
      deleteTask: (taskText, taskElement) => {
        tasksLists.inProgressTasksList.deleteTask(taskText, taskElement);
      },
      doneTask: (taskText, taskElement) => {
        tasksLists.inProgressTasksList.deleteTask(taskText, taskElement);
        tasksLists.doneTasksList.setTask(addTaskDone(taskText), taskText);
      },
    },
    constants.taskTemplate,
  );
  const taskElement = task.generate();
  return taskElement;
};

const addTaskDone = (item) => {
  const task = new TaskDone(
    {
      text: item,
      editTask: (taskText, taskElement) => {
        popupEditTask.open(taskText, taskElement);
      },
      deleteTask: (taskText, taskElement) => {
        tasksLists.doneTasksList.deleteTask(taskText, taskElement);
      },
    },
    constants.taskTemplate,
  );
  const taskElement = task.generate();
  return taskElement;
};

tasksLists.toDoTasksList = new Section(
  {
    keyInLocalStorage: 'toDo',
    renderer: (taskText) => {
      tasksLists.toDoTasksList.setTask(addTask(taskText), taskText);
    },
  },
  constants.toDoTaskSection,
);

tasksLists.inProgressTasksList = new Section(
  {
    keyInLocalStorage: 'inProgress',
    renderer: (taskText) => {
      tasksLists.inProgressTasksList.setTask(addTaskInProgress(taskText), taskText);
    },
  },
  constants.inProgressTaskSection,
);

tasksLists.doneTasksList = new Section(
  {
    keyInLocalStorage: 'done',
    renderer: (taskText) => {
      tasksLists.doneTasksList.setTask(addTaskDone(taskText), taskText);
    },
  },
  constants.doneTaskSection,
);

const popupAddTask = new PopupAddTask(
  {
    handleSubmit: (taskText) => {
      tasksLists.toDoTasksList.setTask(addTask(taskText), taskText);
      popupAddTask.close();
    },
  },
  constants.popupAddTask,
);

const popupEditTask = new PopupEditTask(
  {
    handleSubmit: (taskText, taskElement) => {
      const tasksList = taskElement.parentNode.id;
      tasksLists[`${tasksList}TasksList`].editTask(taskText, taskElement);
      popupEditTask.close();
    },
  },
  constants.popupEditTask,
);

theme.enableTheme();
tasksLists.toDoTasksList.setAppLoadListener();
tasksLists.inProgressTasksList.setAppLoadListener();
tasksLists.doneTasksList.setAppLoadListener();

constants.buttonAddTask.addEventListener('click', () => {
  popupAddTask.open();
});
