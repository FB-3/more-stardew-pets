const vscode = acquireVsCodeApi();

const game = {
  //Div where the pets are stored
  div: document.getElementById('pets'),

  //Window
  width: window.innerWidth,
  height: window.innerHeight,
  scale: 2,
  mouse: {
    element: document.getElementById('mouse'),
    pos: new Vec2(),
    hasGift: false,
    hasBall: false,
  },
  ball: {
    element: document.getElementById('ball'),
  },

  //Frames & framerate
  frames: 0,  //Frames since game start
  fps: 30,
  
  //List with all the pets
  pets: []
}

const MouseTypes = {
  none: '',
  gift: 'gift',
  ball: 'ball',
}





 /*$       /$$             /$$
| $$      |__/            | $$
| $$       /$$  /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$
| $$      | $$ /$$_____/|_  $$_/   /$$__  $$| $$__  $$ /$$__  $$ /$$__  $$ /$$_____/
| $$      | $$|  $$$$$$   | $$    | $$$$$$$$| $$  \ $$| $$$$$$$$| $$  \__/|  $$$$$$
| $$      | $$ \____  $$  | $$ /$$| $$_____/| $$  | $$| $$_____/| $$       \____  $$
| $$$$$$$$| $$ /$$$$$$$/  |  $$$$/|  $$$$$$$| $$  | $$|  $$$$$$$| $$       /$$$$$$$/
|________/|__/|_______/    \___/   \_______/|__/  |__/ \_______/|__/      |______*/

//Messages from VSCode
window.addEventListener('message', event => {
  //The JSON data sent by the extension
  const message = event.data; 

  //Check message type
  switch (message.type.toLowerCase()) {
    //Update ball
    case 'ball':
      //Remove ball
      if (game.ball.element.hasAttribute('visible')) onBallReached()
      //Toggle grabbing ball & disable gift
      game.mouse.hasBall = !game.mouse.hasBall;
      game.mouse.hasGift = false;
      break;

    //Update gift
    case 'gift':
      game.mouse.hasBall = false;
      game.mouse.hasGift = !game.mouse.hasGift;
      break;

    //Create a pet
    case 'add':
      switch (message.specie) {
        //Create a cat
        case 'cat':
          new Cat(message.name, message.color);
          break;

        //Create a dog
        case 'dog':
          new Dog(message.name, message.color);
          break;

        //Create a raccoon
        case 'raccoon':
          new Raccoon(message.name, message.color);
          break;

        //Create a dino
        case 'dino':
          new Dino(message.name, message.color);
          break;

        //Create a duck
        case 'duck':
          new Duck(message.name, message.color);
          break;

        //Create a turtle
        case 'turtle':
          new Turtle(message.name, message.color);
          break;

        //Create a goat
        case 'goat':
          new Goat(message.name, message.color);
          break;

        //Create a sheep
        case 'sheep':
          new Sheep(message.name, message.color);
          break;

        //Create a ostrich
        case 'ostrich':
          new Ostrich(message.name, message.color);
          break;

        //Create a pig
        case 'pig':
          new Pig(message.name, message.color);
          break;

        //Create a rabbit
        case 'rabbit':
          new Rabbit(message.name, message.color);
          break;

        //Create a chicken
        case 'chicken':
          new Chicken(message.name, message.color);
          break;

        //Create a cow
        case 'cow':
          new Cow(message.name, message.color);
          break;

        //Create a junimo
        case 'junimo':
          new Junimo(message.name, message.color);
          break;
      }
      break;

    //Remove a pet
    case 'remove':
      const pet = game.pets[message.index];
      pet.element.remove()
      game.pets.splice(message.index, 1);
      break;

    //Update background
    case 'background':
      game.div.setAttribute('background', message.value.toLowerCase());
      break;

    //Update scale
    case 'scale':
      switch (message.value.toLowerCase()) {
        case 'small':
          game.scale = 1;
          break;
        case 'medium':
        default:
          game.scale = 2;
          break;
        case 'big':
          game.scale = 3;
          break;
      }
      document.body.style.setProperty('--scale', game.scale);
      onResize();
      break;
  }
});

//Mouse (ball & gift)
function setMouseType(type) {
  if (typeof type != 'string') type = MouseTypes.none
  game.mouse.element.setAttribute('type', type)
}

function onBallReached() {
  game.pets.forEach((pet) => { if (pet.ai.state == AI.MOVING_BALL) pet.ai.setState(AI.IDLE) })
  game.ball.element.removeAttribute('visible')
}

game.div.onclick = (event) => {
  //Move ball
  if (game.mouse.hasBall) {
    //Get ball position
    const ballPos = game.mouse.pos.div(game.scale).toInt()

    //Move ball
    game.ball.element.style.setProperty('--position-x', ballPos.x + 'px');
    game.ball.element.style.setProperty('--position-y', ballPos.y + 'px');
    game.ball.element.style.zIndex = ballPos.y
    game.ball.element.setAttribute('visible', '')
    
    //Move all pets towards ball
    game.pets.forEach((pet) => pet.moveTowardsBall(ballPos.sub(pet.size.mult(new Vec2(0.5, 0.8)).toInt())))
  }

  //Hide mouse
  game.mouse.hasBall = false
  game.mouse.hasGift = false
  setMouseType(MouseTypes.none)
}

game.div.onmousemove = (event) => {
  game.mouse.pos = new Vec2(event.clientX, event.clientY)
  game.mouse.element.style.left = game.mouse.pos.x + 'px'
  game.mouse.element.style.top = game.mouse.pos.y + 'px'
}

game.div.onmouseenter = (event) => {
  setMouseType(game.mouse.hasBall ? MouseTypes.ball : game.mouse.hasGift ? MouseTypes.gift : MouseTypes.none)
}

game.div.onmouseleave = (event) => {
  setMouseType(MouseTypes.none)
}

//Resize window
function onResize() {
  //Update game window size
  game.width = window.innerWidth;
  game.height = window.innerHeight;

  //Fit all pets on screen
  game.pets.forEach((pet) => pet.moveTo(pet.pos))
}





 /*$
| $$
| $$        /$$$$$$   /$$$$$$   /$$$$$$
| $$       /$$__  $$ /$$__  $$ /$$__  $$
| $$      | $$  \ $$| $$  \ $$| $$  \ $$
| $$      | $$  | $$| $$  | $$| $$  | $$
| $$$$$$$$|  $$$$$$/|  $$$$$$/| $$$$$$$/
|________/ \______/  \______/ | $$____/
                              | $$
                              | $$
                              |_*/

function update() {
  //Window size changed
  if (game.width != window.innerWidth || game.height != window.innerHeight) onResize()

  //Next frame
  game.frames++

  //Update pets
  game.pets.forEach((pet) => pet.update())
}





 /*$                           /$$
| $$                          |__/
| $$        /$$$$$$   /$$$$$$  /$$  /$$$$$$$
| $$       /$$__  $$ /$$__  $$| $$ /$$_____/
| $$      | $$  \ $$| $$  \ $$| $$| $$
| $$      | $$  | $$| $$  | $$| $$| $$
| $$$$$$$$|  $$$$$$/|  $$$$$$$| $$|  $$$$$$$
|________/ \______/  \____  $$|__/ \_______/
                     /$$  \ $$ 
                    |  $$$$$$/
                     \_____*/

//Start loop
const timer = setInterval(update, 1000 / game.fps)

//Tell vscode game loaded
vscode.postMessage({ type: 'init' })
