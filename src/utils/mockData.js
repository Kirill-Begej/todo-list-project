const toDo = ['test1', 'test2', 'test3'];

export const setMockData = () => {
  localStorage.setItem('toDo', JSON.stringify(toDo));
};
