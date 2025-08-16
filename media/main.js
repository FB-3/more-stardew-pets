const vscode = acquireVsCodeApi()

//Actions
const Action = {
    none: '',
    gift: 'gift',
    ball: 'ball',
}

//Game info
const Game = {
    //Window
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 2,

    //Element where the pets are stored
    element: document.getElementById('pets'),

    //Action being performed
    action: Action.none,
    isAction: (action) => { return Game.action == action },
    setAction: (action) => { 
        Game.action = action
        Game.cursor.setIcon(action)
    },

    //Cursor
    cursor: {
        element: document.getElementById('cursor'),
        setIcon: (icon) => { 
            Game.cursor.element.setAttribute('icon', icon) 
        },
        pos: new Vec2(),
        moveTo: (pos) => {
            Game.cursor.pos = pos
            Game.cursor.element.style.left = pos.x + 'px'
            Game.cursor.element.style.top = pos.y + 'px'
        },
    },

    //Ball
    ball: {
        element: document.getElementById('ball'),
        isVisible: false,
        setVisible: (visible) => {
            if (typeof visible !== 'boolean') visible = true
            if (visible)
                Game.ball.element.setAttribute('visible', '')
            else
                Game.ball.element.removeAttribute('visible')
            Game.ball.isVisible = visible
        },
        pos: new Vec2(),
        moveTo: (pos) => {
            Game.ball.pos = pos
            Game.ball.element.style.zIndex = pos.y
            Game.ball.element.style.setProperty('--position-x', pos.x + 'px');
            Game.ball.element.style.setProperty('--position-y', pos.y + 'px');
        },
    },

    //Frames & framerate
    frames: 0,  //Frames since game start
    fps: 30,

    //List with all the pets
    pets: []
}


 /*$$$$$$$                              /$$     /$$
| $$_____/                             | $$    |__/
| $$    /$$   /$$ /$$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$$
| $$$$$| $$  | $$| $$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$ /$$_____/
| $$__/| $$  | $$| $$  \ $$| $$        | $$    | $$| $$  \ $$| $$  \ $$|  $$$$$$
| $$   | $$  | $$| $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$ \____  $$
| $$   |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$ /$$$$$$$/
|__/    \______/ |__/  |__/ \_______/   \___/  |__/ \______/ |__/  |__/|______*/

//Cursor icon
function setCursorIcon(icon) {
    //Fix invalid type
    if (typeof icon != 'string') icon = Action.none

    //Set cursor type
    Game.cursor.setIcon(icon)
}

//Actions menu
const actionsMenu = document.getElementById('actions')

function toggleActionsMenu(open) {
    //Fix args
    if (typeof open !== 'boolean') 
        open = !actionsMenu.hasAttribute('open')

    //Toggle menu
    if (open) 
        actions.setAttribute('open', '')
    else 
        actions.removeAttribute('open')
}

function toggleActionBall(event) {
    //Ball is visible -> Remove it
    if (Game.ball.isVisible) onBallReached()
    
    //Toggle ball action
    Game.setAction(Game.isAction(Action.ball) ? Action.none : Action.ball)

    //Hide actions menu
    toggleActionsMenu(false)
}

function toggleActionGift(event) {
    //Toggle gift action
    Game.setAction(Game.isAction(Action.gift) ? Action.none : Action.gift)

    //Hide actions menu
    toggleActionsMenu(false)
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
        //Toggle actions menu
        case 'actions':
            toggleActionsMenu()
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
})

//Cursor info
document.onclick = event => {
    //No action
    if (Game.isAction(Action.none)) return

    //Place ball
    if (Game.isAction(Action.ball)) {
        //Get ball position
        const pos = Game.cursor.pos.div(Game.scale).toInt()

        //Move ball
        Game.ball.moveTo(pos)
        Game.ball.setVisible(true)

        //Move all pets towards ball
        Game.pets.forEach(pet => pet.moveTowardsBall(pos))
    }

    //Clear current action
    Game.setAction(Action.none)
}

document.onmousemove = event => {
    //Mouse moved -> Update cursor position
    Game.cursor.moveTo(new Vec2(event.clientX, event.clientY))
}

document.onmouseenter = event => {
    //Mouse entered screen -> Show cursor
    Game.cursor.setIcon(Game.action)
}

document.onmouseleave = event => {
    //Mouse left screen -> Hide cursor
    Game.cursor.setIcon(Action.none)
}

//Ballin ⛹🏾
function onBallReached() {
    //Tell pets to stop moving towards the ball
    Game.pets.forEach(pet => { if (pet.ai.state == AI.MOVING_BALL) pet.ai.setState(AI.IDLE) })

    //Hide ball
    Game.ball.setVisible(false)
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

//Main loop function
function update() {
    //Check if window size changed
    if (Game.width != window.innerWidth || Game.height != window.innerHeight) onResize()

    //Next frame
    Game.frames++

    //Update pets
    Game.pets.forEach(pet => pet.update())
}

//Start loop
const timer = setInterval(update, 1000 / Game.fps)

//Tell VSCode the game was loaded
vscode.postMessage({ type: 'init' })
