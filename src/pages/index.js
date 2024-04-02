import 'normalize.css';
import './index.scss';
import Theme from '../components/Theme';
import { buttonTheme } from '../utils/constants';
import { checkTheme, setTheme } from '../utils/theme';

const theme = new Theme(buttonTheme, setTheme, checkTheme);

theme.enableTheme();
