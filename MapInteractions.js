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
