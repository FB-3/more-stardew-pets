const vscode = acquireVsCodeApi();

//Cursor types
const Cursors = {
    none: '',
    gift: 'gift',
    ball: 'ball',
}

//Game info
const Game = {
    //Div where the pets are stored
    element: document.getElementById('pets'),

    //Window
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 2,
    cursor: {
        element: document.getElementById('cursor'),
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
            if (Game.ball.element.hasAttribute('visible')) onBallReached()
            
            //Toggle grabbing ball & disable gift
            Game.cursor.hasBall = !Game.cursor.hasBall;
            Game.cursor.hasGift = false;
            break;

        //Update gift
        case 'gift':
            //Toggle gift & disable grabbing ball
            Game.cursor.hasBall = false;
            Game.cursor.hasGift = !Game.cursor.hasGift;
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
            const pet = Game.pets[message.index];
            pet.element.remove()
            Game.pets.splice(message.index, 1);
            break;

        //Update background
        case 'background':
            Game.element.setAttribute('background', message.value.toLowerCase());
            break;

        //Update scale
        case 'scale':
            switch (message.value.toLowerCase()) {
                case 'small':
                    Game.scale = 1;
                    break;
                case 'medium':
                default:
                    Game.scale = 2;
                    break;
                case 'big':
                    Game.scale = 3;
                    break;
            }
            document.body.style.setProperty('--scale', Game.scale);
            onResize();
            break;
    }
});

//Cursor (ball & gift)
function setCursorType(type) {
    //Fix invalid type
    if (typeof type != 'string') type = Cursors.none

    //Set cursor type
    Game.cursor.element.setAttribute('type', type)
}

Game.element.onclick = event => {
    //Move ball
    if (Game.cursor.hasBall) {
        //Get ball position
        const ballPos = Game.cursor.pos.div(Game.scale).toInt()

        //Move ball
        Game.ball.element.style.zIndex = ballPos.y
        Game.ball.element.style.setProperty('--position-x', ballPos.x + 'px');
        Game.ball.element.style.setProperty('--position-y', ballPos.y + 'px');
        Game.ball.element.setAttribute('visible', '')

        //Move all pets towards ball
        Game.pets.forEach(pet => pet.moveTowardsBall(ballPos.sub(pet.size.mult(new Vec2(0.5, 0.8)).toInt())))
    }

    //Hide cursor
    Game.cursor.hasBall = false
    Game.cursor.hasGift = false
    setCursorType(Cursors.none)
}

Game.element.onmousemove = event => {
    //Mouse moved -> Update cursor position
    Game.cursor.pos = new Vec2(event.clientX, event.clientY)
    Game.cursor.element.style.left = Game.cursor.pos.x + 'px'
    Game.cursor.element.style.top = Game.cursor.pos.y + 'px'
}

Game.element.onmouseenter = event => {
    //Mouse entered screen -> Show cursor if needed
    setCursorType(Game.cursor.hasBall ? Cursors.ball : Game.cursor.hasGift ? Cursors.gift : Cursors.none)
}

Game.element.onmouseleave = event => {
    //Mouse left screen -> Hide cursor
    setCursorType(Cursors.none)
}

//Ballin ⛹🏾
function onBallReached() {
    //Tell pets to stop moving towards the ball
    Game.pets.forEach(pet => { if (pet.ai.state == AI.MOVING_BALL) pet.ai.setState(AI.IDLE) })

    //Hide ball
    Game.ball.element.removeAttribute('visible')
}

//Window resize
function onResize() {
    //Update game window size
    Game.width = window.innerWidth;
    Game.height = window.innerHeight;

    //Fit all pets on screen
    Game.pets.forEach(pet => pet.moveTo(pet.pos))
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

//Main loop
function update() {
    //Check if window size changed
    if (Game.width != window.innerWidth || Game.height != window.innerHeight) onResize()

    //Next frame
    Game.frames++

    //Update pets
    Game.pets.forEach(pet => pet.update())
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
const timer = setInterval(update, 1000 / Game.fps)

//Tell vscode game loaded
vscode.postMessage({ type: 'init' })
