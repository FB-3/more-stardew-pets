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
    //Close actions menu & decor mode UI
    Menus.close();

    //Hide decor mode UI
    DecorMode.toggleUI(false);

    //Ball is visible -> Remove it
    if (Ball.isVisible) Ball.onReached();
    
    //Toggle ball action
    Game.setAction(Game.isAction(Action.BALL) ? Action.NONE : Action.BALL);
}

function toggleActionGift() {
    //Close actions menu
    Menus.close();

    //Hide decor mode UI
    DecorMode.toggleUI(false);

    //Toggle gift action
    Game.setAction(Game.isAction(Action.GIFT) ? Action.NONE : Action.GIFT);
}

function toggleActionDecor() {
    //Close actions menu
    Menus.close(); 
    
    //Toggle decor mode
    DecorMode.toggle();
}

//Store menu
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
        element.onclick = () => openStoreCategoryMenu(category);
        content.appendChild(element);
    }

    //Scroll to top
    content.scrollTop = 0;
    
    //Show store menu
    Menus.toggle('store', true);
}

function openStoreCategoryMenu(category) {
    //Empty list
    const content = document.getElementById('storeContent');
    content.innerHTML = '';

    //Add back button
    const back = createStoreItem('> Back');
    back.onclick = openStoreMenu;
    content.appendChild(back);

    //Create category items
    for (const name of Object.keys(DecorationPreset[category])) {
        //Get decoration preset
        const preset = DecorationPreset[category][name];

        //Create item element
        const element = createStoreItem(name, preset.price);
        content.appendChild(element);
        
        //Add image to element
        const imgBox = document.createElement('div');
        const img = document.createElement('div');
        img.style.setProperty('--image', `url('./sprites/decoration.png')`)
        img.style.setProperty('--width', `${preset.size.x}px`)
        img.style.setProperty('--height', `${preset.size.y}px`)
        img.style.setProperty('--scale', `${50 / Math.max(preset.size.x, preset.size.y)}`)
        img.style.setProperty('--spriteOffset', `${-preset.spriteOffset.x}px ${-preset.spriteOffset.y}px`)
        imgBox.prepend(img);
        element.prepend(imgBox);

        //Add buy function
        element.onclick = () => {
            //Check if decoration price is valid
            if (typeof preset.price !== 'number') return;

            //Check if player has enough money
            if (Game.money < preset.price) return;

            //Close actions menu
            Menus.close();

            //Enter decor mode
            DecorMode.toggle(true);

            //Consume money
            Game.addMoney(-preset.price);

            //Create decoration
            const decor = new Decoration(preset);

            //Center decoration with mouse & start dragging it
            const decorCenterRelativePos = decor.size.mult(0.5);
            decor.moveTo(decor.snapPos(Cursor.scaledPos.sub(decorCenterRelativePos)));
            decor.startDragging(decorCenterRelativePos);

            //Notify decor added
            vscode.postMessage({
                type: 'add_decor',
                x: decor.pos.x,
                y: decor.pos.y,
                category: category,
                name: name
            });
        }
    }

    //Scroll to top
    content.scrollTop = 0;
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
        //Init
        case 'init':
            document.body.removeAttribute('hide');
            break;
    
        //Reset
        case 'reset':
            //Remove pets
            for (const pet of Game.pets) Game.objects.removeItem(pet);
            Game.pets = [];

            //Remove decor
            for (const decor of Game.decoration) Game.objects.removeItem(decor);
            Game.decoration = [];

            //Close menus & exit decor mode
            Menus.close();
            DecorMode.toggle(false);
            break;
    
        //Spawn a pet/enemy/decor
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
        
        case 'spawn_decor': {
            const pos = new Vec2(message.x, message.y)
            const category = message.category.toUpperCase().replaceAll(' ', '_');
            const name = message.name.toUpperCase().replaceAll(' ', '_');
            new Decoration(DecorationPreset[category][name], { pos: pos });
            break;
        }

        //Remove a pet
        case 'remove_pet':
            Game.pets[message.index].remove();
            break;

        //Toggle actions menu
        case 'actions':
            //Stop ball/gift action
            if (Game.isAction(Action.BALL) || Game.isAction(Action.GIFT)) Game.setAction(Action.NONE);
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
    }
})

//Cursor events
document.onmousedown = event => {
    //Menu open -> Ignore click
    if (Menus.current) return;

    //Get scaled mouse position
    const pos = Cursor.scaledPos;

    //Perform action
    switch (Game.action) {
        //Decor mode
        case Action.DECOR: {
            //Sort objects
            Game.sortObjects();

            //Check to drag decoration from nearest to farthest object
            for (let i = Game.objects.length - 1; i >= 0; i--) {
                //Get object
                const obj = Game.objects[i];

                //Check if its decoration
                if (!(obj instanceof Decoration)) continue;

                //Check event
                if (obj.checkMouseDown(pos)) break;
            }
            break;
        }
    }
}

document.onmouseup = event => {
    //Menu open -> Ignore click
    if (Menus.current) return;

    //Get scaled mouse position
    const pos = Cursor.scaledPos;

    //Perform action
    switch (Game.action) {
        //Decor mode
        case Action.DECOR: {
            //Check decor action
            switch (DecorMode.action) {
                //Move
                case DecorMode.MOVE:
                    //Stop moving all
                    Game.decoration.forEach(obj => obj.stopDragging());
                    break;

                //Sell
                case DecorMode.SELL:
                    //Sort objects
                    Game.sortObjects();

                    //Check to click decoration from nearest to farthest object
                    for (let i = Game.objects.length - 1; i >= 0; i--) {
                        //Get object
                        const obj = Game.objects[i];

                        //Check if its decoration
                        if (!(obj instanceof Decoration)) continue;

                        //Check event
                        if (obj.checkMouseUp(pos)) break;
                    }
                    break;
            }
            break;
        }

        //Place ball
        case Action.BALL: {
            //Move ball
            Ball.moveTo(pos);
            Ball.setVisible(true);

            //Move all pets towards ball
            Game.pets.forEach(pet => pet.moveTowardsBall(pos));

            //Clear current action
            Game.setAction(Action.NONE);
            break;
        }

        //Other
        default:
            //Sort objects
            Game.sortObjects();

            //Check for clicks from nearest to farthest object
            for (let i = Game.objects.length - 1; i >= 0; i--) {
                //Get object
                const obj = Game.objects[i];

                //Check event
                if (obj.checkMouseUp(pos)) break;
            }
            
            //Clear current action
            Game.setAction(Action.NONE);
            break;
    }
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