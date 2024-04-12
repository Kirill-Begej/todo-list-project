export const root = document.querySelector('.root');
export const buttonTheme = document.querySelector('.button-theme__input');
export const buttonAddTask = document.querySelector('#buttonAddTask');
export const toDoTaskSection = document.querySelector('#toDo');
export const inProgressTaskSection = document.querySelector('#inProgress');
export const completedTaskSection = document.querySelector('#completed');
export const taskTemplate = document.querySelector('#taskTemplate');
export const popupAddTask = document.querySelector('#popupAddTask');
export const popupEditTask = document.querySelector('#popupEditTask');
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__button-save_inactive',
};
