// STATE LAYERING FIX

const statePaths = document.querySelectorAll('path');

function handleMouseOver(event) {
  const stateElement = event.target;
  d3.select(stateElement).raise();
  stateElement.classList.add('hovered');
}

function handleMouseOut(event) {
  const stateElement = event.target;
  stateElement.classList.remove('hovered');
}

statePaths.forEach(path => {
  path.addEventListener('mouseover', handleMouseOver);
  path.addEventListener('mouseout', handleMouseOut);
});

function bringStateToFront(stateAbbr) {
  const stateElement = document.getElementById(stateAbbr);
  if (stateElement) {
    d3.select(stateElement).raise();
  }
}

// Zoom and Pan

const zoomElement = document.querySelector(".zoomspace");
let zoom = 1;
const ZOOM_SPEED = 1;
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;

document.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    if (zoom > 1) {
      zoom -= ZOOM_SPEED;
      updateTransform();
    }
  } else if (zoom < 5) {
    zoom += ZOOM_SPEED;
    updateTransform();
  }
});

zoomElement.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
  if (zoom > 1) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  }
}

function drag(e) {
  if (isDragging && zoom > 1) {
    e.preventDefault();
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  }
}

function endDrag() {
  isDragging = false;
}

document.addEventListener('DOMContentLoaded', (event) => {
  const Zoomin = document.getElementById('Zoomin');
  Zoomin.addEventListener('click', handleClickZin);

  const Zoomout = document.getElementById('Zoomout');
  Zoomout.addEventListener('click', handleClickZout);

  const Resetview = document.getElementById('Resetview');
  Resetview.addEventListener('click', handleClickReset);
});

function handleClickZout(event) {
  if (zoom > 1) {
    zoom -= ZOOM_SPEED;
    updateTransform();
  }
}

function handleClickZin(event) {
  if (zoom < 5) {
    zoom += ZOOM_SPEED;
    updateTransform();
  }
}

function handleClickReset(event) {
  zoom = 1;
  resetPosition();
}

function updateTransform() {
  zoomElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
  if (zoom === 1) {
    resetPosition();
  }
}

function resetPosition() {
  translateX = 0;
  translateY = 0;
  updateTransform();
}
