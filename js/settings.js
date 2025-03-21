import { defaultSrList } from './config.js'

function loadSrList() {
  let srList = JSON.parse(localStorage.getItem('srList')) || defaultSrList;
  const listElement = document.getElementById('srList');
  listElement.innerHTML = '';

  srList.forEach((subreddit, index) => {
    let li = document.createElement('li');
    li.textContent = subreddit;
    li.draggable = true; // Enable drag and drop
    li.dataset.index = index; // Store index for reference

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeSubreddit(index);
    li.appendChild(removeBtn);

    listElement.appendChild(li);
  });

  addDragAndDrop();
}

function addSubreddit() {
  let newSubreddit = document.getElementById('newSubreddit').value.trim();
  if (newSubreddit) {
    let srList = JSON.parse(localStorage.getItem('srList')) || defaultSrList;
    srList.push(newSubreddit);
    localStorage.setItem('srList', JSON.stringify(srList));
    document.getElementById('newSubreddit').value = '';
    loadSrList();
  }
}

function removeSubreddit(index) {
  let srList = JSON.parse(localStorage.getItem('srList')) || defaultSrList;
  srList.splice(index, 1);
  localStorage.setItem('srList', JSON.stringify(srList));
  loadSrList();
}

function resetList() {
  localStorage.setItem('srList', JSON.stringify(defaultSrList));
  loadSrList();
}

function addDragAndDrop() {
  const list = document.getElementById('srList');
  let draggedItem = null;

  list.querySelectorAll('li').forEach(item => {
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      item.classList.add('dragging');
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(list, e.clientY);
      if (afterElement == null) {
        list.appendChild(draggedItem);
      } else {
        list.insertBefore(draggedItem, afterElement);
      }
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      updateSrListOrder();
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateSrListOrder() {
  let newOrder = [];
  document.querySelectorAll('#srList li').forEach(li => {
    newOrder.push(li.textContent.replace('Remove', '').trim());
  });
  localStorage.setItem('srList', JSON.stringify(newOrder));
}

function placeAddButton() {
  // <button onclick='addSubreddit()'>Add</button>

  let addBtn = document.createElement('button');
  addBtn.textContent = 'Add';
  addBtn.onclick = () => addSubreddit();
  document.body.appendChild(addBtn);
}

function placeResetButton() {
  // <button onclick='resetList()'>Reset to Default</button>

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset to Default';
  resetBtn.onclick = () => resetList();
  document.body.appendChild(resetBtn);
}

placeAddButton();
placeResetButton();
loadSrList();
