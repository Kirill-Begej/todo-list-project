import { buttonTheme, root } from './constants';

const setDarkTheme = () => {
  root.classList.remove('normal');
  root.classList.add('dark');
  localStorage.setItem('theme', 'dark');
};

const setNormalTheme = () => {
  root.classList.remove('dark');
  root.classList.add('normal');
  localStorage.setItem('theme', 'normal');
};

export const setTheme = (button) => {
  if (button.checked) {
    setDarkTheme();
  } else {
    setNormalTheme();
  }
};

export const checkTheme = (theme) => {
  if (theme && theme === 'dark') {
    setDarkTheme();
    buttonTheme.checked = true;
  } else {
    localStorage.setItem('theme', 'normal');
  }
};
