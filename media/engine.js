 /*$   /$$   /$$     /$$ /$$
| $$  | $$  | $$    |__/| $$
| $$  | $$ /$$$$$$   /$$| $$
| $$  | $$|_  $$_/  | $$| $$
| $$  | $$  | $$    | $$| $$
| $$  | $$  | $$ /$$| $$| $$
|  $$$$$$/  |  $$$$/| $$| $$
 \______/    \___/  |__/|_*/

//Classes
class Vec2 {

    //Position
    x = 0;
    y = 0;

    //Constructor
    constructor(x, y) {
        //Init from Vec2
        if (typeof x == 'object') {
            y = x.y;
            x = x.x;
        }

        //Init from numbers
        this.x = typeof x == 'number' ? x : 0;
        this.y = typeof y == 'number' ? y : this.x;
    }

    //Functions
    clone() {
        return new Vec2(this.x, this.y);
    }

    add(n) {
        if (typeof n === 'object')
            return new Vec2(this.x + n.x, this.y + n.y);
        else
            return new Vec2(this.x + n, this.y + n);
    }

    sub(n) {
        if (typeof n === 'object')
            return new Vec2(this.x - n.x, this.y - n.y);
        else
            return new Vec2(this.x - n, this.y - n);
    }

    mult(n) {
        if (typeof n === 'object')
            return new Vec2(this.x * n.x, this.y * n.y);
        else
            return new Vec2(this.x * n, this.y * n);
    }

    div(n) {
        if (typeof n === 'object')
            return new Vec2(this.x / n.x, this.y / n.y);
        else
            return new Vec2(this.x / n, this.y / n);
    }

    mod(n) {
        if (typeof n === 'object')
            return new Vec2(this.x % n.x, this.y % n.y);
        else
            return new Vec2(this.x % n, this.y % n);
    }

    toInt() {
        return new Vec2(Math.floor(this.x), Math.floor(this.y));
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

}

class Timer {

    //Info
    #active = false;
    #end = 0;

    get justFinished() { return this.#active && Game.frames == this.#end; }
    get finished() { return this.#active && Game.frames >= this.#end; }

    //Constructor
    constructor() { }

    //Functions
    count(frames) {
        this.#active = true;
        this.#end = Game.frames + frames;
    }

    reset() {
        this.#active = false;
    }

}

class Timeout {

    //Info
    #fun;
    #timeout;

    //Constructor
    constructor(fun, duration) {
        this.#fun = fun;
        if (typeof duration === 'number') this.wait(duration);
    }

    //Functions
    wait(duration) {
        clearTimeout(this.#timeout);
        this.#timeout = setTimeout(this.#fun, duration);
    }

}

class Util {

    static randomExclusive(max) {
        //Random number from 0 to max exclusive
        return Math.floor(Math.random() * (max));
    }

    static randomInclusive(max) {
        //Random number from 0 to max inclusive
        return Math.floor(Math.random() * (max + 1));
    }

    static clamp(number, min, max) {
        //Clamp number between min a max
        return Math.min(Math.max(number, min), max);
    }

    static moveTowards(current, target, delta) {
        //Get distance
        const diff = target - current;
        const distance = Math.abs(diff);

        //Move towards target
        return (distance < delta ? target : current + diff / distance * delta)
    }
        
    static titleCase(str) {
        const parts = str.toLowerCase().split(' ');
        for (var i = 0; i < parts.length; i++) parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
        return parts.join(' ');
    }

}

//Array extensions
Array.prototype.removeAt = function(index) {
    const elem = this[index];
    this.splice(index, 1);
    return elem;
}

Array.prototype.removeItem = function(elem) {
    const index = this.indexOf(elem);
    this.splice(index, 1);
    return index;
}


 /*$$$$$$$                     /$$
| $$_____/                    |__/
| $$       /$$$$$$$   /$$$$$$  /$$ /$$$$$$$   /$$$$$$
| $$$$$   | $$__  $$ /$$__  $$| $$| $$__  $$ /$$__  $$
| $$__/   | $$  \ $$| $$  \ $$| $$| $$  \ $$| $$$$$$$$
| $$      | $$  | $$| $$  | $$| $$| $$  | $$| $$_____/
| $$$$$$$$| $$  | $$|  $$$$$$$| $$| $$  | $$|  $$$$$$$
|________/|__/  |__/ \____  $$|__/|__/  |__/ \_______/
                     /$$  \ $$
                    |  $$$$$$/
                     \_____*/

//Actions
class Action {

    static get NONE() { return ''; }
    static get GIFT() { return 'gift'; }
    static get BALL() { return 'ball'; }
    static get DECOR() { return 'decor'; }

}

//Ball
class Ball {

    //Ball HTML element
    static element = document.getElementById('ball');

    //Position
    static pos = new Vec2();

    static moveTo(pos) {
        Ball.pos = pos;
        Ball.element.style.setProperty('--position-x', `${pos.x}px`);
        Ball.element.style.setProperty('--position-y', `${pos.y}px`);
    }

    //Visibility
    static isVisible = false;

    static setVisible(visible) {
        //Fix args
        if (typeof visible !== 'boolean') visible = true;

        //Toggle visibility
        if (visible) {
            Ball.element.setAttribute('visible', '');
        } else {
            Ball.element.removeAttribute('visible');
        }
        Ball.isVisible = visible;
    }

    //Pets
    static onReached() {
        //Tell pets to stop moving towards the ball
        Game.pets.forEach(pet => { if (pet.ai.state == PetAI.MOVE_BALL) pet.ai.setState(AI.IDLE) })

        //Hide ball
        Ball.setVisible(false);
    }
    
}

//Menus
class Menus {

    //Black semitransparent menus backdrop
    static backdrop = document.getElementById('menus');

    //Toggle menus
    static current;     //Name of the currently open menu

    static toggle(name, show) {
        //Invalid name
        if (typeof name !== 'string') return;
        
        //Get menu
        const menu = document.getElementById(name);
        if (!menu) return;

        //Fix show
        const isVisible = menu.hasAttribute('show');
        if (typeof show !== 'boolean') {
            //Invalid value -> Toggle menu visibility
            show = !isVisible;
        } else if (show == isVisible) {
            //Same state -> Return
            return;
        }

        //Toggle menu
        if (show) {
            //Close currently open menu
            Menus.toggle(Menus.current, false);

            //Show menu
            menu.setAttribute('show', '');
            Menus.current = name;
            Menus.backdrop.setAttribute('show', '');
        } else {
            //Hide menu
            menu.removeAttribute('show');
            Menus.current = undefined;
            Menus.backdrop.removeAttribute('show');
        }
    }

}

//Cursor
class Cursor {

    //Cursor HTML element
    static element = document.getElementById('cursor');

    //Position
    static pos = new Vec2();
    static get scaledPos() { return Cursor.pos.div(Game.scale).toInt(); }

    static moveTo(pos) {
        Cursor.pos = pos;
        Cursor.element.style.left = `${pos.x}px`;
        Cursor.element.style.top = `${pos.y}px`;
    }

    //Icon
    static icons = [Action.BALL, Action.GIFT];

    static setIcon(icon) {
        //Valid icons
        icon = Cursor.icons.includes(icon) ? icon : Action.NONE;

        //Change cursor icon
        Cursor.element.setAttribute('icon', icon);

        //Toggle real cursor
        document.body.setAttribute('cursor', icon != Action.NONE ? 'none' : '');
    }

}

//Game
class Game {
    
    //Media folder URI
    static mediaURI = document.body.getAttribute('media');

    //Window
    static size = new Vec2(window.innerWidth, window.innerHeight);
    static scale = 2;
    static scaledSize = new Vec2(window.innerWidth / 2, window.innerHeight / 2);

    static onResize() {
        //Update game window size
        Game.size = new Vec2(window.innerWidth, window.innerHeight);
        Game.scaledSize = Game.size.div(Game.scale);

        //Update game canvas size
        Game.canvas.width = Game.size.x;
        Game.canvas.height = Game.size.y;

        //Fit all pets on screen
        Game.pets.forEach(pet => pet.moveTo(pet.pos))
    }

    //Update
    static frames = 0;  //Frames since game start
    static fps = 30;    //Game framerate

    static update() {
        //Check if window size changed
        if (Game.size.x != window.innerWidth || Game.size.y != window.innerHeight) Game.onResize();

        //Next frame
        Game.frames++;

        //Update game objects
        Game.objects.forEach(obj => obj.update());

        //Draw
        requestAnimationFrame(Game.draw);
    }

    //Rendering
    static background = document.getElementById('background');
    static canvas = document.getElementById('canvas');
    static ctx = document.getElementById('canvas').getContext('2d');
    static hiddenCanvas = document.getElementById('hiddenCanvas');
    static hiddenCtx = document.getElementById('hiddenCanvas').getContext('2d');

    static draw() {
        //Clear canvas
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

        //Sort objects
        Game.sortObjects();

        //Check if in decor mode
        const inDecorMode = Game.isAction(Action.DECOR);

        //Draw objects
        for (const obj of Game.objects) {
            //Check if in decor mode and object is not decor
            if (inDecorMode && !(obj instanceof Decoration)) continue;

            //Draw object
            obj.draw(Game.ctx)
        }
    }

    //Game objects
    static objects = [];    //List of all the game objects
    static enemies = [];    //List of all the enemies
    static pets = [];       //List of all the pets       (do not sort, positions must be the same as in extension.ts)
    static decoration = []; //List of all the decoration (do not sort, positions must be the same as in extension.ts)
    static enemySpawner = new Timeout(() => vscode.postMessage({ type: 'spawn_enemy' }), 30 * 1000);

    static sortObjects() {
        //Sort objects for rendering
        Game.objects.sort((a, b) => { return a.sortingLayer != b.sortingLayer ? a.sortingLayer - b.sortingLayer : a.sortingOrder - b.sortingOrder; }); 
    }

    //Money
    static money = 0;
    static moneyText = document.getElementById('moneyText');

    static setMoney(amount) {
        Game.money = amount;
        Game.moneyText.innerText = `${amount}G`;
    }

    static addMoney(amount) {
        Game.setMoney(Game.money + amount);
        Game.showMessage(`${amount >= 0 ? '+' : '-'}${Math.abs(amount)}G`);
        vscode.postMessage({ type: 'money', value: Game.money });
    }

    //Decor mode
    static decorExit = document.getElementById('decorExit');

    static toggleDecorExit(show) {
        //Fix args
        if (typeof show !== 'boolean') show = !Game.decorExit.hasAttribute('show');

        //Toggle
        if (show)
            Game.decorExit.setAttribute('show', '');
        else
            Game.decorExit.removeAttribute('show');
    }

    //Current action being performed
    static action = Action.NONE;

    static isAction(action) { 
        return Game.action == action;
    }

    static setAction(action) {
        Game.action = action;
        Cursor.setIcon(action);
    }

    //Messages
    static showMessage(content) {
        //Create message element
        const message = document.createElement('span');
        message.classList.add('message');
        message.innerText = content;
        document.getElementById('messages').appendChild(message);

        //Set timeout to remove message element after 2s
        setTimeout(() => message.remove(), 2000);
    }

}

//Animations
class Animation {

    //Animation info (temporal)
    #frame = 0;
    #counter = 0;
    #finished = false;
    get finished() { return this.#finished; };

    //Animation info (permanent)
    #frames = [];
    #speed = 5;   //Duration of each frame
    #loop = true;
    get loop() { return this.#loop; };
    #flip = false;
    get flip() { return this.#flip; };


    //State
    constructor(frames, speed, config) {
        //Animation info
        this.#frames = frames;
        this.#speed = speed;

        //Check config
        if (typeof config === 'object') {
            if (typeof config.loop === 'boolean') this.#loop = config.loop;
            if (typeof config.flip === 'boolean') this.#flip = config.flip;
        }

        //Reset current info
        this.reset();
    }

    reset() {
        //Reset current info
        this.#frame = 0;
        this.#counter = 0;
        this.#finished = false;
    }

    update() {
        //Not finished
        if (!this.finished) {
            //Add one to counter
            this.#counter++;

            //Check if counter finished
            if (this.#counter >= this.#speed) {
                //Counter finished -> Reset it
                this.#counter = 0;

                //Next frame
                if (!this.#loop && this.#frame >= this.#frames.length - 1) {
                    //Already in last frame & not looping -> Finish animation
                    this.#finished = true;
                } else {
                    //Next frame
                    this.#frame++;
                    if (this.#frame >= this.#frames.length) this.#frame = 0;
                }
            }
        }

        //Return animation sprite position
        const offset = this.#frames[this.#frame];
        return new Vec2(offset[0], offset[1]);
    }

}

//Game objects
class GameObject {

    //Position & Size
    #pos = new Vec2();
    get pos() { return this.#pos; }
    #size = new Vec2(16);
    get size() { return this.#size; }

    //Clicks
    #clickable = true;
    get clickable() { return this.#clickable; }

    //Rendering (sorting)
    #sortingLayer = 0;
    get sortingLayer() { return this.#sortingLayer; }
    get sortingOrder() { return this.pos.y + this.size.y; }

    //Rendering (sprite sheet)
    #image = new Image();               //Image containing the sprite sheet
    get image() { return this.#image; }
    #spriteOffset = new Vec2();         //Offset for sprites inside a sprite sheet
    get spriteOffset() { return this.#spriteOffset; }
    #spriteSheetOffset = new Vec2();    //Offset for images with multiple sprite sheets
    get spriteSheetOffset() { return this.#spriteSheetOffset; }

    //Animations
    #animations = {};                   //Object of animations with their names as keys
    get animations() { return this.#animations; }
    #animation;                         //Currently selected animation
    get animation() { return this.#animation; }


    //Constructor
    constructor(config = {}) {
        //Add to game objects list
        Game.objects.push(this);

        //No config
        if (typeof config !== 'object') return;

        //Position & size
        if (typeof config.pos === 'object') this.#pos = config.pos;
        if (typeof config.size === 'object') this.#size = config.size;

        //Clicks
        if (typeof config.clickable === 'boolean') this.#clickable = config.clickable;

        //Rendering (sorting)
        if (typeof config.sortingLayer === 'number') this.#sortingLayer = config.sortingLayer;

        //Rendering (sprite sheet)
        if (typeof config.image === 'string') this.#image.src = `${Game.mediaURI}sprites/${config.image}`;
        if (typeof config.spriteOffset === 'object') this.#spriteOffset = config.spriteOffset;
        if (typeof config.spriteSheetOffset === 'object') this.#spriteSheetOffset = config.spriteSheetOffset;

        //Animation
        if (typeof config.animations === 'object') this.#animations = config.animations;
    }

    remove() {
        //Remove from objects list
        Game.objects.removeItem(this);
    }

    //Update
    update() {
        //Update animation sprite offset
        if (this.#animation) this.#spriteOffset = this.#animation.update().mult(this.size);
    }

    //Clicks
    isValidMousePos(pos) {
        //Not clickable
        if (!this.clickable) return false;

        //Check if clicked inside bounding box
        if (!this.isPosInBounds(pos)) return false;

        //Check if clicked on transparent pixel
        if (!this.isPosInSprite(pos, Game.hiddenCanvas, Game.hiddenCtx)) return false;

        //Valid 
        return true;
    }

    isPosInBounds(pos) {
        //Return true if pos is inside bounding box
        return pos.x >= this.pos.x && pos.x <= this.pos.x + this.size.x && pos.y >= this.pos.y && pos.y <= this.pos.y + this.size.y;
    }

    isPosInSprite(pos, canvas, ctx) {
        //Get relative click position
        const relPos = pos.sub(this.pos);  

        //Change canvas size to match object size
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        
        //Clear canvas & draw object at origin
        ctx.clearRect(0, 0, this.size.x, this.size.y);
        this.draw(ctx, { pos: new Vec2() });

        //Get pixel at pos & check alpha
        const pixelData = ctx.getImageData(relPos.x, relPos.y, 1, 1).data;
        return pixelData[3] !== 0;
    }

    checkMouseDown(clickPos) {
        //Check if mouse pos is valid
        if (!this.isValidMousePos(clickPos)) return false;
        
        //Mouse down event
        return this.mouseDown(clickPos);
    }

    checkMouseUp(clickPos) {
        //Check if mouse pos is valid
        if (!this.isValidMousePos(clickPos)) return false;
        
        //Click event
        return this.mouseUp(clickPos);
    }
    
    mouseDown(pos) {
        //Mouse down was consumed
        return true;
    }

    mouseUp(pos) {
        //Mouse up was consumed
        return true;
    }

    //Rendering
    draw(ctx, config = {}) {
        //Get info
        const pos = (typeof config.pos === 'object' ? config.pos : this.pos);

        //Save context transform
        ctx.save(); 

        //Translate sprite
        ctx.translate(pos.x, pos.y);

        //Flip sprite
        if (this.animation && this.animation.flip) {
            ctx.translate(this.size.x, 0);
            ctx.scale(-1, 1);
        }
        
        //Draw sprite
        ctx.drawImage(
            this.image,     //Image
            this.spriteSheetOffset.x + this.spriteOffset.x, //Sprite offset x
            this.spriteSheetOffset.y + this.spriteOffset.y, //Sprite offset y
            this.size.x,         //Source sprite width
            this.size.y,         //Source sprite height
            0,              //Position
            0,              //Position
            this.size.x,         //Drawing width
            this.size.y          //Drawing height
        );

        //Restore context transform
        ctx.restore();
    }

    //Animations
    animate(name, force) {
        //Not an animation
        if (typeof this.animations[name] !== 'object') return;

        //Fix force animation
        if (typeof force !== 'boolean') force = false;

        //Get animation
        let animation = this.animations[name];
        if (Array.isArray(animation)) animation = animation[Util.randomExclusive(animation.length)];

        //Change current animation & reset it
        if (animation == this.animation && !force) return;
        this.#animation = animation;
        this.animation.reset();
    }

    //Movement
    get maxPosX() { return Math.floor(Game.scaledSize.x - this.size.x); }
    get maxPosY() { return Math.floor(Game.scaledSize.y - this.size.y); }
    get randomPoint() { return new Vec2(Util.randomInclusive(this.maxPosX), Util.randomInclusive(this.maxPosY)); }

    moveTo(pos, ignoreWalls = false) {
        //Clamp new position
        if (!ignoreWalls) {
            pos.x = Util.clamp(pos.x, 0, this.maxPosX);
            pos.y = Util.clamp(pos.y, 0, this.maxPosY);
        }

        //Update position
        this.#pos = pos;
    }

    respawn() {
        //Move to random point
        this.moveTo(this.randomPoint);
    }

}