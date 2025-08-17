//Animations
class Animation {

    //Animation info (temporal)
    finished = false;
    #frame = 0;
    #counter = 0;

    //Animation info (permanent)
    #frames = [];
    #speed = 5;   //Duration of each frame
    #loop = true;
    get loop() { return this.#loop; };
    #flip = false;
    get flip() { return this.#flip; };


    //State
    constructor(frames, speed, options) {
        //Animation info
        this.#frames = frames;
        this.#speed = speed;

        //Check options
        if (typeof options === 'object') {
            if (typeof options.loop === 'boolean') this.#loop = options.loop;
            if (typeof options.flip === 'boolean') this.#flip = options.flip;
        }

        //Reset current info
        this.reset();
    }

    reset() {
        //Reset current info
        this.#frame = 0;
        this.#counter = 0;
        this.finished = false;
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
                    this.finished = true;
                } else {
                    //Next frame
                    this.#frame++;
                    if (this.#frame >= this.#frames.length) this.#frame = 0;
                }
            }
        }

        //Return animation sprite position
        return this.#frames[this.#frame]
    }

}

//AI
class AI {

    //States
    static get IDLE() { return 'idle' };
    static get MOVE() { return 'move' };
    static get SPECIAL() { return 'special' };

    //AI info
    #character;
    get character() { return this.#character; }
    #state = AI.IDLE;
    get state() { return this.#state; }
    #timer = new Timer();
    get timer() { return this.#timer; }
    #movePos = new Vec2();

    //Options (idle)
    #idleDurationBase = 2 * Game.fps;       //Minimum duration of idle (in frames)
    #idleDurationVariation = 2 * Game.fps;  //Variation of duration for idle (in frames)
    get idleDuration() { return this.#idleDurationBase + random(this.#idleDurationVariation); }

    //Options (sleep)
    #canSleep = true;
    #isSleeping = false;
    #sleepDurationBase = 10 * Game.fps;     //Minimum duration of sleep (in frames)
    #sleepDurationVariation = 5 * Game.fps; //Variation of duration for sleep (in frames)
    get sleepDuration() { return this.#sleepDurationBase + random(this.#sleepDurationVariation); }

    //Options (special)
    #specialDuration = 2 * Game.fps;        //Duration of special (in frames)
    get specialDuration() { return this.#specialDuration; }


    //Constructor
    constructor(options) {
        //Check options
        if (typeof options == 'object') {
            //Idle options
            if (typeof options.idleDurationBase == 'number') this.#idleDurationBase = options.idleDurationBase;
            if (typeof options.idleDurationVariation == 'number') this.#idleDurationVariation = options.idleDurationVariation;

            //Sleep options
            if (typeof options.canSleep == 'boolean') this.#canSleep = options.canSleep;
            if (typeof options.sleepDurationBase == 'number') this.#sleepDurationBase = options.sleepDurationBase;
            if (typeof options.sleepDurationVariation == 'number') this.#sleepDurationVariation = options.sleepDurationVariation;

            //Special options
            if (typeof options.specialDuration == 'number') this.#specialDuration = options.specialDuration;
        }
    }

    assign(character) {
        //Assign character 
        this.#character = character;
    }

    //Movement
    _moveTowardsMovePos() {
        //Move position out of bounds -> Create a new one
        if (this.#movePos.x > this.character.maxPosX || this.#movePos.y > this.character.maxPosY) {
            this.moveTowards(this.character.randomPoint);
            return true
        }

        //Try to move
        if (this.#movePos.x < this.character.pos.x)
            this.moveLeft();
        else if (this.#movePos.x > this.character.pos.x)
            this.moveRight();
        else if (this.#movePos.y < this.character.pos.y)
            this.moveUp();
        else if (this.#movePos.y > this.character.pos.y)
            this.moveDown();
        else
            return false

        //Moved
        return true
    }

    moveTowards(point) {
        //Change move point
        this.#movePos = point;

        //Set state to moving
        this.setState(AI.MOVE);
    }

    moveTowardsRandom() {
        //Move towards random point
        this.moveTowards(this.character.randomPoint);
    }

    moveLeft() {
        this.character.moveTo(this.character.pos.x - 1, this.character.pos.y);
        this.character.animate('moveLeft');
    }

    moveRight() {
        this.character.moveTo(this.character.pos.x + 1, this.character.pos.y);
        this.character.animate('moveRight');
    }

    moveUp() {
        this.character.moveTo(this.character.pos.x, this.character.pos.y - 1);
        this.character.animate('moveUp');
    }

    moveDown() {
        this.character.moveTo(this.character.pos.x, this.character.pos.y + 1);
        this.character.animate('moveDown');
    }

    //Actions
    onClick() {}

    //State
    update() {
        //Run on update for current state
        const onUpdate = this[`onUpdate_${this.state}`];
        if (typeof onUpdate === 'function') onUpdate.call(this);
    }

    setState(newState) {
        //Not a valid state
        if (typeof newState !== 'string') return;

        //Run on end for old state
        const onEnd = this[`onEnd_${this.state}`];
        if (typeof onEnd === 'function') onEnd.call(this);

        //Set state
        this.#state = newState;

        //Run on start for new state
        const onStart = this[`onStart_${this.state}`];
        if (typeof onStart === 'function') onStart.call(this);
    }

    //State: IDLE
    onStart_idle() {
        //Animate idle
        this.character.animate('idle');

        //Start timer
        this.timer.count(this.idleDuration);

        //Reset sleeping
        this.#isSleeping = false;
    }

    onUpdate_idle() {
        //Timer didn't finish
        if (!this.timer.finished) return;

        //Reset timer
        this.timer.reset();

        //Check action (75% chance to sleep if it can)
        if (this.#canSleep && !this.#isSleeping && random(99) < 75) {
            //Animate sleep
            this.character.animate('sleep');

            //Set state to sleep-idle
            this.#isSleeping = true;

            //Start sleep timer
            this.timer.count(this.sleepDuration);
        } else {
            //Move towards a random point
            this.moveTowardsRandom();
        }
    }

    //State: MOVE
    onUpdate_move() {
        //Try to move
        if (this._moveTowardsMovePos()) return;
        
        //Didn't move -> Point reached

        //Animate idle
        this.setState(AI.IDLE);
    }

    //State: SPECIAL
    onStart_special() {
        //Animate special
        this.character.animate('special', true);

        //Start timer to move again
        this.timer.count(this.specialDuration);
    }

    onUpdate_special() {
        //Timer didn't finish
        if (!this.timer.finished) return;

        //Reset timer
        this.timer.reset();

        //Move towards a random point
        this.moveTowardsRandom();
    }

}

//Characters
class Character {

    //Element & AI
    #element;
    get element() { return this.#element; }
    #ai;
    get ai() { return this.#ai; }
    
    //Position & Size
    #pos = new Vec2();
    get pos() { return this.#pos; }
    _size = new Vec2(32);
    get size() { return this._size; }

    //Animations
    #animation;
    _animations = {
        'moveDown': new Animation(
            [[0, 0]],
            5,
        ),
        'moveRight': new Animation(
            [[0, 0]],
            5,
        ),
        'moveLeft': new Animation(
            [[0, 0]],
            5,
            { flip: true }
        ),
        'moveUp': new Animation(
            [[0, 0]],
            5
        ),
        'idle': new Animation(
            [[0, 0]],
            5,
            { loop: false },
        ),
        'sleep': new Animation(
            [[0, 0]],
            30,
            { loop: false },
        ),
        'special': new Animation(
            [[0, 0]],
            5,
            { loop: false },
        ),
    };


    //Constructor
    constructor(ai) {
        //Assign AI
        this.#ai = ai
        ai.assign(this)

        //Create character element
        const element = document.createElement('div');
        Game.element.appendChild(element);
        this.#element = element;

        //Add on click listener
        element.onclick = () => this.#ai.onClick();

        //Respawn character
        this.respawn();
    }

    //Update
    update() {
        //Update AI
        this.ai.update();

        //Update animation sprite
        if (this.#animation) this.#selectSprite(this.#animation.update())
    }

    //Movement
    get maxPosX() { return Math.floor((Game.width / Game.scale) - this.size.x); }
    get maxPosY() { return Math.floor((Game.height / Game.scale) - this.size.y); }
    get randomPoint() { return new Vec2(random(this.maxPosX), random(this.maxPosY)); }

    moveTo(x, y) {
        //moveTo(Vec2) instead of moveTo(x, y)
        if (typeof x == 'object') {
            y = x.y;
            x = x.x;
        }

        //Clamp new position
        x = clamp(x, 0, this.maxPosX);
        y = clamp(y, 0, this.maxPosY);

        //Update position
        this.#pos.x = x;
        this.#pos.y = y;

        //Move element
        this.element.style.setProperty('--position-x', x + 'px');
        this.element.style.setProperty('--position-y', y + 'px');
        this.element.style.zIndex = y + this.size.y;
    }

    respawn() {
        //Move to random point
        this.moveTo(this.randomPoint);
    }

    //Animations
    animate(name, force) {
        //Not an animation
        if (typeof this._animations[name] !== 'object') return;

        //Fix force animation
        if (typeof force !== 'boolean') force = false;

        //Get animation
        let animation = this._animations[name];
        if (Array.isArray(animation)) animation = animation[random(animation.length - 1)];

        //Change current animation & reset it
        if (animation == this.#animation && !force) return;
        this.#animation = animation;
        this.#animation.reset();

        //Flip sprite
        if (animation.flip) 
            this.element.setAttribute('flip', '');
        else 
            this.element.removeAttribute('flip')
    }

    #selectSprite(offset) {
        this.element.style.setProperty('--offset-x', -(offset[0] * this.size.x) + 'px');
        this.element.style.setProperty('--offset-y', -(offset[1] * this.size.y) + 'px');
    }

}