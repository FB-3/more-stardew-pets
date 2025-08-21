//VSCode API
const vscode = acquireVsCodeApi()


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
    Game.setAction(Game.isAction(Action.BALL) ? Action.NONE : Action.BALL)

    //Hide actions menu
    Menus.toggle('actions', false);
}

function toggleActionGift() {
    //Toggle gift action
    Game.setAction(Game.isAction(Action.GIFT) ? Action.NONE : Action.GIFT)

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
        //Spawn a pet/enemy
        case 'spawn_pet': {
            const name = message.name;
            const specie = message.specie.toLowerCase();
            const color = message.color.toLowerCase();
            switch (specie) {
                case 'cat':
                    new Cat(name, color);
                    break;
                case 'dog':
                    new Dog(name, color);
                    break;
                case 'raccoon':
                    new Raccoon(name, color);
                    break;
                case 'dino':
                    new Dino(name, color);
                    break;
                case 'duck':
                    new Duck(name, color);
                    break;
                case 'turtle':
                    new Turtle(name, color);
                    break;
                case 'goat':
                    new Goat(name, color);
                    break;
                case 'sheep':
                    new Sheep(name, color);
                    break;
                case 'ostrich':
                    new Ostrich(name, color);
                    break;
                case 'pig':
                    new Pig(name, color);
                    break;
                case 'rabbit':
                    new Rabbit(name, color);
                    break;
                case 'chicken':
                    new Chicken(name, color);
                    break;
                case 'cow':
                    new Cow(name, color);
                    break;
                case 'junimo':
                    new Junimo(name, color);
                    break;
            }
            break;
        }
        
        case 'spawn_enemy': {
            const specie = message.specie.toLowerCase();
            const color = message.color.toLowerCase();
            switch (specie) {
                case 'slime':
                    new Slime(color);
                    break;
                case 'bug':
                    new Bug(color);
                    break;
                case 'crab':
                    new Crab(color);
                    break;
                case 'golem':
                    new Golem(color);
                    break;
            }
            break;
        }

        //Remove a pet
        case 'remove_pet':
            Game.pets[message.index].remove();
            break;

        //Toggle actions menu
        case 'actions':
            Game.setAction(Action.NONE)
            Menus.toggle('actions')
            break;

        //Update background
        case 'background':
            Game.background.setAttribute('background', message.value.toLowerCase());
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
            Game.ctx.scale(Game.scale, Game.scale);
            Game.onResize();
            break;
    
        //Update money
        case 'money': 
            Game.setMoney(message.value)
            break;

        //Init
        case 'init':
            document.body.removeAttribute('hide');
            break;
    }
})

//Cursor info
document.onclick = event => {
    //Get scaled mouse position
    const pos = Cursor.pos.div(Game.scale).toInt()

    //Perform action
    switch (Game.action) {
        //Place ball
        case Action.BALL: {
            //Move ball
            Ball.moveTo(pos)
            Ball.setVisible(true)

            //Move all pets towards ball
            Game.pets.forEach(pet => pet.moveTowardsBall(pos))
            break;
        }

        //Other
        default:
            //Sort objects
            Game.sortObjects();

            //Check for clicks from nearest to farthest object
            for (let i = Game.objects.length - 1; i >= 0; i--) {
                const obj = Game.objects[i];
                if (obj.checkClick(pos)) break;
            }
            break;
    }

    //Clear current action
    Game.setAction(Action.NONE)
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
    Cursor.setIcon(Action.NONE)
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

//Start game loop
const timer = setInterval(Game.update, 1000 / Game.fps)

//Tell VSCode the game was loaded
vscode.postMessage({ type: 'init' })

//Decoration testing
const max = 6
const size = new Vec2(48, 48)
const category = DecorationPreset.RUGS
const items = Object.keys(category);
for (let i = 0; i < items.length; i++) {
    const preset = category[items[i]];
    new Decoration({ pos: new Vec2(i % max * size.x, Math.floor(i / max) * size.y) }, preset);
}