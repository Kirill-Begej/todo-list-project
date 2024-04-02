import { root } from './constants';

const setColorTheme = (element, removeClass, addClass) => {
  element.classList.remove(removeClass);
  element.classList.add(addClass);
  localStorage.setItem('theme', addClass);
};

export const setTheme = (button) => {
  if (button.checked) {
    setColorTheme(root, 'normal', 'dark');
  } else {
    setColorTheme(root, 'dark', 'normal');
  }
};

export const checkTheme = (theme, button) => {
  if (theme && theme === 'dark') {
    setColorTheme(root, 'normal', 'dark');
    button.checked = true;
  } else {
    localStorage.setItem('theme', 'normal');
  }
};
