const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');

// Event: Mulai drag
tasks.forEach(task => {
  task.addEventListener('dragstart', () => {
    task.classList.add('dragging');
  });

  task.addEventListener('dragend', () => {
    task.classList.remove('dragging');
  });
});

// Event: Drag over kolom
columns.forEach(column => {
  column.addEventListener('dragover', e => {
    e.preventDefault(); // Penting agar droppable
    column.classList.add('drag-over');
    const dragging = document.querySelector('.dragging');
    column.appendChild(dragging);
  });

  column.addEventListener('dragleave', () => {
    column.classList.remove('drag-over');
  });

  column.addEventListener('drop', () => {
    column.classList.remove('drag-over');
  });
});
