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
    //Hide actions menu
    Menus.toggle('actions', false);

    //Ball is visible -> Remove it
    if (Ball.isVisible) Ball.onReached()
    
    //Toggle ball action
    Game.setAction(Game.isAction(Action.BALL) ? Action.NONE : Action.BALL)
}

function toggleActionGift() {
    //Hide actions menu
    Menus.toggle('actions', false);

    //Toggle gift action
    Game.setAction(Game.isAction(Action.GIFT) ? Action.NONE : Action.GIFT)
}

function toggleDecorMode() {
    //Hide actions menu
    Menus.toggle('actions', false);

    //Exit decor mode
    if (Game.isAction(Action.DECOR)) {
        Game.setAction(Action.NONE);
        Game.toggleDecorExit(false);
        return;
    }

    //No decoration
    if (Game.decoration.length <= 0) {
        Game.showMessage('Buy decoration first');
        return;
    }

    //Enter decor mode
    Game.setAction(Action.DECOR);
    Game.toggleDecorExit(true);
}

//Store menu
function openStoreMenu() {
    //Empty list
    const content = document.getElementById('storeContent');
    content.innerHTML = '';

    //Add back button
    const back = createStoreItem('> Back');
    back.onclick = () => Menus.toggle('actions', true);
    content.appendChild(back);

    //Create decoration categories
    for (const category of Object.keys(DecorationPreset)) {
        //Create item element
        const element = createStoreItem(category);
        element.onclick = () => selectStoreCategory(category);
        content.appendChild(element);
    }

    //Scroll to top
    content.scrollTop = 0;
    
    //Show store menu
    Menus.toggle('store', true);
}

function selectStoreCategory(category) {
    //Empty list
    const content = document.getElementById('storeContent');
    content.innerHTML = '';

    //Add back button
    const back = createStoreItem('> Back');
    back.onclick = openStoreMenu;
    content.appendChild(back);

    //Create category items
    for (const name of Object.keys(DecorationPreset[category])) {
        //Get item
        const item = DecorationPreset[category][name];

        //Create item element
        const element = createStoreItem(name, item.price);
        content.appendChild(element);
        
        //Add image to element
        const imgBox = document.createElement('div');
        const img = document.createElement('div');
        img.style.setProperty('--image', `url('./sprites/decoration/decoration.png')`)
        img.style.setProperty('--width', `${item.size.x}px`)
        img.style.setProperty('--height', `${item.size.y}px`)
        img.style.setProperty('--scale', `${50 / Math.max(item.size.x, item.size.y)}`)
        img.style.setProperty('--spriteOffset', `${-item.spriteOffset.x}px ${-item.spriteOffset.y}px`)
        imgBox.prepend(img);
        element.prepend(imgBox);
    }

    //Scroll to top
    content.scrollTop = 0;
}

function createStoreItem(name, price) {
    //Item element
    const element = document.createElement('div');
    element.classList.add('menuButton', 'storeButton');

    //Name text element
    const text = document.createElement('span');
    text.innerText = Util.titleCase(name.toLowerCase().replaceAll('_', ' '));
    element.append(text);

    //Add price to text
    if (typeof price === 'number') text.innerHTML += `<br><span class="storeButtonMoney">${price}G</span>`;

    //Return element
    return element;
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
            Game.setAction(Action.NONE);
            Game.toggleDecorExit(false);
            Menus.toggle('actions');
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
            Game.setMoney(message.value);
            break;

        //Init
        case 'init':
            document.body.removeAttribute('hide');
            break;
    }
})

//Cursor events
document.onclick = event => {
    //Get scaled mouse position
    const pos = Cursor.pos.div(Game.scale).toInt()

    //Perform action
    switch (Game.action) {
        //Place ball
        case Action.BALL: {
            //Move ball
            Ball.moveTo(pos);
            Ball.setVisible(true);

            //Move all pets towards ball
            Game.pets.forEach(pet => pet.moveTowardsBall(pos));
            break;
        }

        //Decor mode
        case Action.DECOR: {
            return;
        }

        //Other
        default:
            //Sort objects
            Game.sortObjects();

            //Check for clicks from nearest to farthest object
            for (let i = Game.objects.length - 1; i >= 0; i--)
                if (Game.objects[i].checkClick(pos)) 
                    break;
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
/*
const max = 5
const size = new Vec2(32, 48)
const category = DecorationPreset.HOUSE_PLANTS
const items = Object.keys(category);
for (let i = 0; i < items.length; i++) {
    const preset = category[items[i]];
    new Decoration({ pos: new Vec2(i % max * size.x, Math.floor(i / max) * size.y) }, preset);
}
*/