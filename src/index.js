let character = document.getElementById("character");
let game = document.getElementById('game');
let counter = 0;
let currentBlocks = [];
let interval;
let both = 0;
let location = 0;

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
  if (both === 0) {
    both ++;
    if (event.key === "ArrowLeft") {
      interval = setInterval(moveLeft, 1);
    }
    if (event.key === "ArrowRight") {
      interval = setInterval(moveRight, 1);
    }
  }
});

document.addEventListener('keyup', e => {
  clearInterval(interval);
  both = 0;
})

let blocks = setInterval(function() {
  let blockLast = document.getElementById("block"+(counter-1));
  let holeLast = document.getElementById("hole"+(counter-1));
  let blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
  let holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));

  if (blockLastTop < 400 || counter === 0) {
    let block = document.createElement("div");
    let hole = document.createElement("div");

    block.setAttribute("class", "block");
    hole.setAttribute("class", "hole");

    block.setAttribute("id","block"+counter);
    hole.setAttribute("id", "hole"+counter);

    block.style.top = blockLastTop + 60 + "px";
    hole.style.top = holeLastTop + 60 + "px";

    let random = Math.floor(Math.random() * 360);
    hole.style.left = random + "px"
    
    game.appendChild(block);
    game.appendChild(hole);

    currentBlocks.push(counter);
    counter++;
  }
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  var drop = 0;
  if (characterTop <= 0) {
    alert("Game Over. Score: "+(counter-9));
    clearInterval(blocks);
    location.reload();
  }
  for (let i = 0; i < currentBlocks.length; i++) {
    let current = currentBlocks[i];
    let numBlock = document.getElementById("block"+current);
    let numHole = document.getElementById("block"+current);

    let numBlockTop = parseFloat(window.getComputedStyle(numBlock).getPropertyValue("top"));
    let numHoleLeft = parseFloat(window.getComputedStyle(numHole).getPropertyValue("left"));

    numBlock.style.top = numBlockTop - 0.5 + "px";
    numHole.style.top = numBlockTop - 0.5 + "px";

    if (numBlockTop < -20) {
      currentBlocks.shift();
      numBlock.remove();
      numHole.remove();
    }
    if (numBlockTop - 20 < characterTop && numBlockTop > characterTop) {
      drop ++;
      if (numHoleLeft <= characterLeft && numHoleLeft + 20 >= characterLeft) {
        drop = 0;
      }
    }
  }
  if (drop === 0) {
    if (characterTop < 480) {
      character.style.top = characterTop + 2 + "px";
    }
  } else {
    character.style.top = characterTop - 0.5 + "px"
  }
}, 1);
