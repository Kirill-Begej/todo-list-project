import 'normalize.css';
import './index.scss';
import Theme from '../components/Theme';
import Section from '../components/Section';
import Task from '../components/Task';
import * as constants from '../utils/constants';
import { checkTheme, setTheme } from '../utils/theme';
import { setMockData } from '../utils/mockData';
import PopupAddTask from '../components/PopupAddTask';

const theme = new Theme({ setTheme, checkTheme }, constants.buttonTheme);

theme.enableTheme();

setMockData();

const toDoTasksList = new Section(
  {
    renderer: (item) => {
      const task = new Task({ text: item }, constants.taskTemplate);
      const taskElement = task.generate();
      toDoTasksList.setTask(taskElement);
    },
  },
  constants.toDoTaskSection,
);

toDoTasksList.setAppLoadListener();

const popupAddTask = new PopupAddTask(constants.popupAddTask);

constants.buttonAddTask.addEventListener('click', () => {
  popupAddTask.open();
});
