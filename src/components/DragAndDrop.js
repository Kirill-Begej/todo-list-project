export default class DragAndDrop {
  dragEventListener(element) {
    element.addEventListener('dragstart', () => {
      setTimeout(() => {
        element.classList.add('task__item_dragging');
      }, 0);
    });
    element.addEventListener('dragend', () => {
      element.classList.remove('task__item_dragging');
    });
  }

  dragoverEventListener(container) {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggingElement = document.querySelector('.task__item_dragging');
      const siblingsDraggingElement = [...container.querySelectorAll('.tasks__item:not(.task__item_dragging)')];
      const nextSibling = siblingsDraggingElement.find(
        (sibling) => e.clientY <= sibling.getBoundingClientRect().y + sibling.offsetHeight / 2,
      );
      if (draggingElement) {
        container.insertBefore(draggingElement, nextSibling);
      }
    });
  }

  dragenterEventListener(container) {
    container.addEventListener('dragenter', (e) => {
      e.preventDefault();
    });
  }

  dragleaveEventListener(container) {
    container.addEventListener('dragleave', (e) => {
      e.preventDefault();
      this._setSectionsInLocalStorage();
    });
  }

  dropEventListener(container) {
    container.addEventListener('drop', (e) => {
      e.preventDefault();
      this._setSectionsInLocalStorage();
      const tasks = [...container.querySelectorAll('.tasks__item-title')].map((item) => item.textContent);
      this._renderedTask = tasks;
      this._setInLocalStorage();
      while (e.currentTarget.firstChild) {
        e.currentTarget.removeChild(e.currentTarget.firstChild);
      }
      this._checkInLocalStorage();
      this._renderTaskOnDrop();
    });
  }
}
