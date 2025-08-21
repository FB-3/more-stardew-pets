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

    static moveTo(pos) {
        Cursor.pos = pos;
        Cursor.element.style.left = `${pos.x}px`;
        Cursor.element.style.top = `${pos.y}px`;
    }

    //Icon
    static setIcon(icon) {
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

    static onResize() {
        //Update game window size
        Game.size = new Vec2(window.innerWidth, window.innerHeight);

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

    static draw() {
        //Clear canvas
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

        //Sort objects from top to bottom
        Game.sortObjects();

        //Draw objects
        Game.objects.forEach(obj => obj.draw(Game.ctx));
    }

    //Game objects
    static objects = [];    //List of all the game objects
    static pets = [];       //List of all the pets
    static enemies = [];    //List of all the enemies
    static enemySpawner = new Timeout(() => vscode.postMessage({ type: 'spawn_enemy' }), 30 * 1000);

    static sortObjects() {
        //Sort objects for rendering
        Game.objects.sort((a, b) => { return (a.pos.y + a.size.y) - (b.pos.y + b.size.y); }); 
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

    //Rendering
    #sprite = new Image();              //Image containing the sprite sheet
    get sprite() { return this.#sprite; }
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
    constructor(config) {
        //Add to game objects list
        Game.objects.push(this);

        //No config
        if (typeof config !== 'object') return;

        //Position & size config
        if (typeof config.pos === 'object') this.#pos = config.pos;
        if (typeof config.size === 'object') this.#size = config.size;

        //Rendering config
        if (typeof config.sprite === 'string') this.#sprite.src = `${Game.mediaURI}sprites/${config.sprite}`;
        if (typeof config.spriteOffset === 'object') this.#spriteOffset = config.spriteOffset;
        if (typeof config.spriteSheetOffset === 'object') this.#spriteSheetOffset = config.spriteSheetOffset;

        //Animation config
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

    //Click
    checkClick(click) {
        //Check if clicked outside element
        if (click.x < this.pos.x || click.x > this.pos.x + this.size.x || 
            click.y < this.pos.y || click.y > this.pos.y + this.size.y) {
            return false;
        }
        
        //Click
        return this.click();
    }
    
    click() {
        //Click was consumed
        return true;
    }

    //Rendering
    draw(ctx) {
        //Save context transform
        ctx.save(); 

        //Translate sprite
        ctx.translate(this.pos.x, this.pos.y);

        //Flip sprite
        if (this.animation && this.animation.flip) {
            ctx.translate(this.size.x, 0);
            ctx.scale(-1, 1);
        }
        
        //Draw sprite
        ctx.drawImage(
            this.sprite,
            this.spriteSheetOffset.x + this.spriteOffset.x,
            this.spriteSheetOffset.y + this.spriteOffset.y, 
            this.size.x,
            this.size.y,
            0,
            0,
            this.size.x,
            this.size.y
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
    get maxPosX() { return Math.floor((Game.size.x / Game.scale) - this.size.x); }
    get maxPosY() { return Math.floor((Game.size.y / Game.scale) - this.size.y); }
    get randomPoint() { return new Vec2(Util.randomInclusive(this.maxPosX), Util.randomInclusive(this.maxPosY)); }

    moveTo(x, y) {
        //moveTo(Vec2) instead of moveTo(x, y)
        if (typeof x == 'object') {
            y = x.y;
            x = x.x;
        }

        //Clamp new position
        x = Util.clamp(x, 0, this.maxPosX);
        y = Util.clamp(y, 0, this.maxPosY);

        //Update position
        this.#pos.x = x;
        this.#pos.y = y;
    }

    respawn() {
        //Move to random point
        this.moveTo(this.randomPoint);
    }

}