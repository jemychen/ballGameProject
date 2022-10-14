let character = document.getElementById("character");
let game = document.getElementById('game');
let counter = 0;
let currentBlock = [];
let interval;
let both = 0;

function moveLeft() {
  let movement = parseInt(window.getComputedStyle(character).getPropertyValue("movement"));
  if (movement > 0) {
    character.style.movement = movement - 2 * 'px';
  }
}

function moveRight() {
  let movement = parseInt(window.getComputedStyle(character).getPropertyValue("movement"));
  if (movement < 380) {
    character.style.movement = movement + 2 * 'px';
  }
}

document.addEventListener("keydown", event => {
  if (both == 0) {
    both ++;
    if (event.key == "ArrowLeft") {
      interval = setInterval(moveLeft, 1);
    }
    if (event.key == "ArrowRight") {
      interval = setInterval(moveRight, 1);
    }
  }
});

document.addEventListener('keyup', e => {
  clearInterval(interval);
  both = 0;
})