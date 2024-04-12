import 'normalize.css';
import './index.scss';
import Theme from '../components/Theme';
import Scrollbar from '../components/Scrollbar';
import DragAndDrop from '../components/DragAndDrop';
import Task from '../components/Task';
import TaskInProgress from '../components/TaskInProgress';
import TaskCompleted from '../components/TaskCompleted';
import Section from '../components/Section';
import FormValidator from '../components/FormValidator';
import PopupAddTask from '../components/PopupAddTask';
import PopupEditTask from '../components/PopupEditTask';
import * as constants from '../utils/constants';
import { checkTheme, setTheme } from '../utils/theme';

const tasksLists = {};
const formValidators = {};

const theme = new Theme({ setTheme, checkTheme }, constants.buttonTheme);
const scrollbar = new Scrollbar();
const dragAndDrop = new DragAndDrop();

const addTask = (item) => {
  const task = new Task(
    {
      text: item,
      editTask: (taskText, taskElement) => {
        popupEditTask.open(taskText, taskElement);
        formValidators.editTaskForm.resetValidation();
      },
      deleteTask: (taskText, taskElement) => {
        tasksLists.toDoTasksList.deleteTask(taskText, taskElement);
      },
      inProgressTask: (taskText, taskElement) => {
        tasksLists.toDoTasksList.deleteTask(taskText, taskElement);
        tasksLists.inProgressTasksList.setTask(addTaskInProgress(taskText), taskText);
      },
      completedTask: (taskText, taskElement) => {
        tasksLists.toDoTasksList.deleteTask(taskText, taskElement);
        tasksLists.completedTasksList.setTask(addTaskCompleted(taskText), taskText);
      },
      dragEventListener: dragAndDrop.dragEventListener,
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
        formValidators.editTaskForm.resetValidation();
      },
      deleteTask: (taskText, taskElement) => {
        tasksLists.inProgressTasksList.deleteTask(taskText, taskElement);
      },
      completedTask: (taskText, taskElement) => {
        tasksLists.inProgressTasksList.deleteTask(taskText, taskElement);
        tasksLists.completedTasksList.setTask(addTaskCompleted(taskText), taskText);
      },
      dragEventListener: dragAndDrop.dragEventListener,
    },
    constants.taskTemplate,
  );
  const taskElement = task.generate();
  return taskElement;
};

const addTaskCompleted = (item) => {
  const task = new TaskCompleted(
    {
      text: item,
      editTask: (taskText, taskElement) => {
        popupEditTask.open(taskText, taskElement);
        formValidators.editTaskForm.resetValidation();
      },
      deleteTask: (taskText, taskElement) => {
        tasksLists.completedTasksList.deleteTask(taskText, taskElement);
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
    rendererOnDrop: (taskText) => {
      tasksLists.toDoTasksList.setTaskOnDrop(addTask(taskText));
    },
    dragoverEventListener: dragAndDrop.dragoverEventListener,
    dragenterEventListener: dragAndDrop.dragenterEventListener,
    dragleaveEventListener: dragAndDrop.dragleaveEventListener,
    dropEventListener: dragAndDrop.dropEventListener,
  },
  constants.toDoTaskSection,
);

tasksLists.inProgressTasksList = new Section(
  {
    keyInLocalStorage: 'inProgress',
    renderer: (taskText) => {
      tasksLists.inProgressTasksList.setTask(addTaskInProgress(taskText), taskText);
    },
    rendererOnDrop: (taskText) => {
      tasksLists.inProgressTasksList.setTaskOnDrop(addTaskInProgress(taskText));
    },
    dragoverEventListener: dragAndDrop.dragoverEventListener,
    dragenterEventListener: dragAndDrop.dragenterEventListener,
    dragleaveEventListener: dragAndDrop.dragleaveEventListener,
    dropEventListener: dragAndDrop.dropEventListener,
  },
  constants.inProgressTaskSection,
);

tasksLists.completedTasksList = new Section(
  {
    keyInLocalStorage: 'completed',
    renderer: (taskText) => {
      tasksLists.completedTasksList.setTask(addTaskCompleted(taskText), taskText);
    },
    rendererOnDrop: (taskText) => {
      tasksLists.completedTasksList.setTaskOnDrop(addTaskCompleted(taskText));
    },
    dragoverEventListener: dragAndDrop.dragoverEventListener,
    dragenterEventListener: dragAndDrop.dragenterEventListener,
    dragleaveEventListener: dragAndDrop.dragleaveEventListener,
    dropEventListener: dragAndDrop.dropEventListener,
  },
  constants.completedTaskSection,
);

const enableValidation = (formConfig) => {
  const formsList = [...document.querySelectorAll(formConfig.formSelector)];
  formsList.forEach((formElement) => {
    const validator = new FormValidator(formConfig, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

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
scrollbar.setClass();
tasksLists.toDoTasksList.addEventListeners();
tasksLists.inProgressTasksList.addEventListeners();
tasksLists.completedTasksList.addEventListeners();
enableValidation(constants.validationConfig);

constants.buttonAddTask.addEventListener('click', () => {
  popupAddTask.open();
  formValidators.addTaskForm.resetValidation();
});
