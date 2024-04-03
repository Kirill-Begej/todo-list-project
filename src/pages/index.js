import 'normalize.css';
import './index.scss';
import Theme from '../components/Theme';
import { buttonTheme, taskTemplate, toDoTaskSection } from '../utils/constants';
import { checkTheme, setTheme } from '../utils/theme';
import { setMockData } from '../utils/mockData';
import { Section } from '../components/Section';
import { Task } from '../components/Task';

const theme = new Theme({ setTheme, checkTheme }, buttonTheme);

theme.enableTheme();

setMockData();

const toDoTasksList = new Section(
  {
    renderer: (item) => {
      const task = new Task({ text: item }, taskTemplate);
      const taskElement = task.generate();
      toDoTasksList.setTask(taskElement);
    },
  },
  toDoTaskSection,
);

toDoTasksList.setAppLoadListener();
