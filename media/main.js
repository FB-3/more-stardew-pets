//VSCode API
const vscode = acquireVsCodeApi()

//Actions
const Action = {
    none: '',
    gift: 'gift',
    ball: 'ball',
}

//Game
const Game = {
    //Window
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 2,

    //Frames & framerate
    frames: 0,  //Frames since game start
    fps: 30,

    //Element where the pets are stored
    element: document.getElementById('pets'),
    pets: [],       //List with all the pets
    enemies: [],    //List with all the enemies

    //Action being performed
    action: Action.none,
    isAction: (action) => { return Game.action == action },
    setAction: (action) => { 
        Game.action = action
        Cursor.setIcon(action)
    },
}

//Cursor
const Cursor = {
    element: document.getElementById('cursor'),

    //Icon
    setIcon: (icon) => { 
        Cursor.element.setAttribute('icon', icon) 
    },

    //Position
    pos: new Vec2(),
    moveTo: (pos) => {
        Cursor.pos = pos
        Cursor.element.style.left = pos.x + 'px'
        Cursor.element.style.top = pos.y + 'px'
    },
}

//Ball
const Ball = {
    element: document.getElementById('ball'),

    //Visibility
    isVisible: false,
    setVisible: (visible) => {
        if (typeof visible !== 'boolean') visible = true
        if (visible)
            Ball.element.setAttribute('visible', '')
        else
            Ball.element.removeAttribute('visible')
        Ball.isVisible = visible
    },

    //Position
    pos: new Vec2(),
    moveTo: (pos) => {
        Ball.pos = pos
        Ball.element.style.zIndex = pos.y
        Ball.element.style.setProperty('--position-x', pos.x + 'px');
        Ball.element.style.setProperty('--position-y', pos.y + 'px');
    },

    //Pets
    onReached: () => {
        //Tell pets to stop moving towards the ball
        Game.pets.forEach(pet => { if (pet.ai.state == PetAI.MOVE_BALL) pet.ai.setState(AI.IDLE) })

        //Hide ball
        Ball.setVisible(false)
    },
}

//Menus
const Menus = {
    backdrop: document.getElementById('menus'),

    //Toggle menus
    current: undefined, //Name of the currently open menu
    toggle: (name, show) => {
        //Invalid name
        if (typeof name !== 'string') return;
        
        //Get menu
        const menu = document.getElementById(name);
        if (!menu) return;

        //Fix show
        const isVisible = menu.hasAttribute('show');
        if (typeof show !== 'boolean') 
            show = !isVisible;
        else if (show == isVisible) 
            return;

        //Toggle menu
        if (show) {
            //Close currently open menu
            Menus.toggle(Menus.current, false);

            //Show menu
            menu.setAttribute('show', '')
            Menus.current = name;
            Menus.backdrop.setAttribute('show', '')
        } else {
            //Hide menu
            menu.removeAttribute('show')
            Menus.current = undefined;
            Menus.backdrop.removeAttribute('show')
        }
    }
}


 /*$$$$$$$                              /$$     /$$
| $$_____/                             | $$    |__/
| $$    /$$   /$$ /$$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$$
| $$$$$| $$  | $$| $$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$ /$$_____/
| $$__/| $$  | $$| $$  \ $$| $$        | $$    | $$| $$  \ $$| $$  \ $$|  $$$$$$
| $$   | $$  | $$| $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$ \____  $$
| $$   |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$ /$$$$$$$/
|__/    \______/ |__/  |__/ \_______/   \___/  |__/ \______/ |__/  |__/|______*/


//Actions menu
function toggleActionBall() {
    //Ball is visible -> Remove it
    if (Ball.isVisible) Ball.onReached()
    
    //Toggle ball action
    Game.setAction(Game.isAction(Action.ball) ? Action.none : Action.ball)

    //Hide actions menu
    Menus.toggle('actions', false);
}

function toggleActionGift() {
    //Toggle gift action
    Game.setAction(Game.isAction(Action.gift) ? Action.none : Action.gift)

    //Hide actions menu
    Menus.toggle('actions', false);
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
            Game.setAction(Action.none)
            Menus.toggle('actions')
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
                case 'big':
                    Game.scale = 3;
                    break;
                case 'medium':
                default:
                    Game.scale = 2;
                    break;
            }
            document.body.style.setProperty('--scale', Game.scale);
            onResize();
            break;
    }
})

//Cursor info
document.onclick = event => {
    //No action -> Return
    if (Game.isAction(Action.none)) return

    //Perform action
    switch (Game.action) {
        //Place ball
        case Action.ball: {
            //Get ball position
            const pos = Cursor.pos.div(Game.scale).toInt()

            //Move ball
            Ball.moveTo(pos)
            Ball.setVisible(true)

            //Move all pets towards ball
            Game.pets.forEach(pet => pet.moveTowardsBall(pos))
            break
        }
    }

    //Clear current action
    Game.setAction(Action.none)
}

document.onmousemove = event => {
    //Mouse moved -> Update cursor position
    Cursor.moveTo(new Vec2(event.clientX, event.clientY))
}

document.onmouseenter = event => {
    //Mouse entered screen -> Show cursor
    Cursor.setIcon(Game.action)
}

document.onmouseleave = event => {
    //Mouse left screen -> Hide cursor
    Cursor.setIcon(Action.none)
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

    //Update enemies
    Game.enemies.forEach(enemy => enemy.update())
}

//Start loop
const timer = setInterval(update, 1000 / Game.fps)

//Tell VSCode the game was loaded
vscode.postMessage({ type: 'init' })
