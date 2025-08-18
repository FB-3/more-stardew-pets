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


 /*$$$$$$             /$$
| $$__  $$           | $$
| $$  \ $$ /$$$$$$  /$$$$$$   /$$$$$$$
| $$$$$$$//$$__  $$|_  $$_/  /$$_____/
| $$____/| $$$$$$$$  | $$   |  $$$$$$
| $$     | $$_____/  | $$ /$$\____  $$
| $$     |  $$$$$$$  |  $$$$//$$$$$$$/
|__/      \_______/   \___/ |______*/

//Animations
class PetAnimations {

    static get DEFAULT() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                5,
                { loop: false }
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5,
                { flip: true }
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'sleep': new Animation(
                [[0, 3], [1, 3]],
                30,
                { loop: false }
            ),
            'special': new Animation(
                [[0, 4], [1, 4], [2, 4], [3, 4], [2, 4], [1, 4], [0, 4], [0, 0]],
                5,
                { loop: false }
            ),
        } 
    };
    
    static get CAT() { 
        return {
            'idle': new Animation(
                [[0, 4], [1, 4], [2, 4]],
                5,
                { loop: false }
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                5
            ),
            'special': new Animation(
                [[0, 5], [1, 5], [2, 5], [3, 5], [0, 5], [2, 4]],
                5,
                { loop: false }
            ),
            'sleep': [
                new Animation(
                    [[0, 7], [1, 7]],
                    30
                ),
                new Animation(
                    [[0, 6], [1, 6], [2, 6], [3, 6]],
                    5,
                    { loop: false }
                )
            ],
        };
    }
        
    static get DOG() { 
        return {
            'idle': new Animation(
                [[0, 5], [1, 5], [2, 5], [3, 5]],
                5,
                { loop: false }
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                5
            ),
            'special': new Animation(
                [[1, 6], [0, 6], [2, 6], [3, 5]],
                5,
                { loop: false }
            ),
            'sleep': new Animation(
                [[0, 7], [1, 7]],
                30
            ),
        };
    }

    static get TURTLE() { 
        return {
            'idle': new Animation(
                [[0, 4]],
                5,
                { loop: false }
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                5
            ),
            'special': new Animation(
                [[0, 6], [1, 6], [2, 6], [3, 6]],
                5
            ),
            'sleep': new Animation(
                [[0, 4], [1, 4], [2, 4], [3, 4], [0, 5]],
                30,
                { loop: false }
            )
        };
    }

    static get DINO() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                5
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                5
            ),
            'special': new Animation(
                [[0, 6], [1, 6], [2, 6], [3, 6], [0, 6], [0, 0]],
                5,
                { loop: false }
            ),
            'sleep': new Animation(
                [[0, 4], [1, 4]],
                30
            ),
        };
    }

    static get DUCK() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                5
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                5
            ),
            'special': new Animation(
                [[0, 6], [1, 6], [2, 6], [3, 6], [2, 6], [3, 6], [2, 6], [1, 6], [0, 6]],
                5,
                { loop: false }
            ),
            'sleep': new Animation(
                [[0, 7], [1, 7]],
                30
            ),
        };
    }

    static get RACCOON() { 
        return {
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
                2
            ),
            'moveLeft': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]],
                2
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
                2
            ),
            'moveRight': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3]],
                2
            ),
            'idle': new Animation(
                [[0, 0]],
                5,
                { loop: false }
            ),
            'special': new Animation(
                [[8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2]],
                5,
                { loop: true }
            )
        };
    }

    static get RABBIT() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                5,
                { loop: false }
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                5
            ),
            'special': new Animation(
                [[0, 6], [1, 6], [2, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 0]],
                5,
                { loop: false }
            ),
            'sleep': new Animation(
                [[0, 4], [1, 4]],
                30,
                { loop: false }
            ),
        };
    }

    static get CHICKEN() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                5,
                { loop: false }
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                5
            ),
            'special': new Animation(
                [[0, 6], [1, 6], [2, 6], [3, 6], [0, 0]],
                5,
                { loop: false }
            ),
            'sleep': new Animation(
                [[0, 4], [1, 4]],
                5,
                { loop: false }
            ),
        };
    }

    static get COW() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                5,
                { loop: false }
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                5
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5
            ),
            'moveLeft': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                5,
                { flip: true }
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                5
            ),
            'special': new Animation(
                [[0, 4], [1, 4], [3, 4], [2, 4], [3, 4], [1, 4], [0, 4]],
                5,
                { loop: false }
            ),
            'sleep': new Animation(
                [[0, 3], [1, 3]],
                30
            ),
        };
    }

    static get JUNIMO() { 
        return {
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
                2
            ),
            'moveRight': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
                2
            ),
            'moveLeft': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
                2,
                { flip: true }
            ),
            'moveUp': new Animation(
                [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]],
                2
            ),
            'idle': new Animation(
                [[0, 0]],
                5,
                { loop: false })
            ,
            'special': [
                new Animation(
                    [[4, 3], [5, 3], [6, 3], [7, 3]],
                    5
                ),
                new Animation(
                    [[4, 5], [5, 5], [6, 5], [7, 5]],
                    5
                )
            ],
            'sleep': new Animation(
                [[4, 1], [5, 1], [6, 1], [7, 1]],
                30
            ),
        };
    }

}

//AI
class PetAI extends AI {

    //States
    static get MOVE_BALL() { return 'moveball' };

    //Moods
    static #moods = ['gigachad', 'happy', 'mad', 'alien', 'pledge', 'blush'];
    #mood = 'gigachad';
    #moodHideTimeout;
    #moodHeartTimeout;


    //State
    constructor(options) {
        super(options);

        //Random mood
        this.#setRandomMood()
    }

    //Mood
    #setHeartMood() {
        //Change mood to heart
        this.#mood = 'heart';

        //Clear heart mood timeout & start a new one
        if (this.#moodHeartTimeout != undefined) clearTimeout(this.#moodHeartTimeout)
        this.#moodHeartTimeout = setTimeout(() => { this.#setRandomMood() }, 10 * 60 * 1000); //Heart stays for 10 minutes
    }

    #setRandomMood() {
        this.#mood = PetAI.#moods[Math.floor(Math.random() * PetAI.#moods.length)];
    }

    showMood() {
        //Show mood
        this.character.element.setAttribute('mood', this.#mood);

        //Clear hide mood timeout & start a new one
        clearTimeout(this.#moodHideTimeout)
        this.#moodHideTimeout = setTimeout(() => { this.character.element.removeAttribute('mood') }, 2000);
    }

    //Movement (override)
    moveTowards(point, towardsBall) {
        super.moveTowards(point)

        //Move towards ball
        if (towardsBall) this.setState(PetAI.MOVE_BALL);
    }

    //Actions (override)
    onClick() {
        //Has gift?
        if (Game.isAction(Action.gift)) {
            //Consume gift
            Game.setAction(Action.none);

            //Set mood to heart
            this.#setHeartMood()
        }

        //Show mood
        this.showMood();

        //Play special animation
        this.setState(AI.SPECIAL);
    }

    //State: MOVING or MOVING_BALL
    onUpdate_moveball() {
        //Try to move
        if (this._moveTowardsMovePos()) return;

        //Didn't move -> Point reached

        //Notify game that the ball was reached
        Ball.onReached()

        //Set mood to heart & show mood
        this.#setHeartMood()
        this.showMood();

        //Animate special
        this.setState(AI.SPECIAL);
    }

}

//Characters
class PetCharacter extends Character {

    //Pet info
    #name = 'Pet';
    get name() { return this.#name; }
    #specie = '';
    get specie() { return this.#specie; }
    #color = 'Color';
    get color() { return this.#color; }
    
    //Animations
    _animations = PetAnimations.DEFAULT;


    //Constructor
    constructor(name, specie, color, options) {
        super(new PetAI(options));

        //Save pet name, specie & color
        this.#name = name;
        this.#specie = specie;
        this.#color = color;

        //Add classes to element
        this.element.classList.add('character');
        this.element.classList.add(this.specie);
        this.element.setAttribute('color', this.color);
        
        //Add pet to pets list
        Game.pets.push(this);

        //Move towards random point
        this.ai.moveTowardsRandom();
    }

    //Movement
    moveTowardsBall(ballPos) {
        //Fix position to have the pet feet at the ball
        const pos = ballPos.sub(this.size.mult(new Vec2(0.5, 0.8)).toInt())

        //Clamp new position
        pos.x = clamp(pos.x, 0, this.maxPosX);
        pos.y = clamp(pos.y, 0, this.maxPosY);

        //Update position
        this.ai.moveTowards(pos, true)
    }

}

class PetCharacterSmall extends PetCharacter {

    //Position & Size
    _size = new Vec2(16);

    //Constructor
    constructor(name, specie, color, options) { super(name, specie, color, options); }

}

//Cat
class Cat extends PetCharacter {

    //Animations
    _animations = PetAnimations.CAT;

    //Constructor
    constructor(name, color) { super(name, 'cat', color); }

}

//Dog
class Dog extends PetCharacter {

    //Animations
    _animations = PetAnimations.DOG;

    //Constructor
    constructor(name, color) { super(name, 'dog', color); }
    
}

//Tutle
class Turtle extends PetCharacter {

    //Animations
    _animations = PetAnimations.TURTLE;

    //Constructor
    constructor(name, color) { super(name, 'turtle', color); }

}

//Dino
class Dino extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.DINO;

    //Constructor
    constructor(name, color) { super(name, 'dino', color); }

}

//Duck
class Duck extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.DUCK;

    //Constructor
    constructor(name, color) { super(name, 'duck', color); }

}

//Raccoon
class Raccoon extends PetCharacter {

    //Animations
    _animations = PetAnimations.RACCOON;

    //Constructor
    constructor(name, color) { super(name, 'raccoon', color, { canSleep: false }); }

}

//Goat, sheep, ostrich, pig
class Goat extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, 'goat', color); }

}

class Sheep extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, 'sheep', color); }

}

class Ostrich extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, 'ostrich', color); }

}

class Pig extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, 'pig', color); }

}

//Rabbit
class Rabbit extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.RABBIT;

    //Constructor
    constructor(name, color) { super(name, 'rabbit', color); }

}

//Chicken
class Chicken extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.CHICKEN;

    //Constructor
    constructor(name, color) { super(name, 'chicken', color); }

}

//Cow
class Cow extends PetCharacter {

    //Animations
    _animations = PetAnimations.COW;

    //Constructor
    constructor(name, color) { super(name, 'cow', color); }

}

//Junimo
class Junimo extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.JUNIMO;

    //Constructor
    constructor(name, color) { super(name, 'junimo', color); }

}


 /*$$$$$$$                                   /$$
| $$_____/                                  |__/
| $$       /$$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$  /$$$$$$   /$$$$$$$
| $$$$$   | $$__  $$ /$$__  $$| $$_  $$_  $$| $$ /$$__  $$ /$$_____/
| $$__/   | $$  \ $$| $$$$$$$$| $$ \ $$ \ $$| $$| $$$$$$$$|  $$$$$$
| $$      | $$  | $$| $$_____/| $$ | $$ | $$| $$| $$_____/ \____  $$
| $$$$$$$$| $$  | $$|  $$$$$$$| $$ | $$ | $$| $$|  $$$$$$$ /$$$$$$$/
|________/|__/  |__/ \_______/|__/ |__/ |__/|__/ \_______/|______*/

//Animations
class EnemyAnimations {

    static get SLIME() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                4,
                { loop: false },
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                4,
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                4,
            ),
            'moveLeft': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                4,
            ),
            'moveUp': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                4,
            ),
            'special': new Animation(
                [[0, 4], [1, 4], [2, 4]],
                4,
                { loop: false },
            ),
        } 
    };

    static get BUG() { 
        return {
            'idle': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                4,
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                4,
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                4,
            ),
            'moveLeft': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                4,
            ),
            'moveUp': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                4,
            ),
            'special': new Animation(
                [[0, 4], [1, 4]],
                4,
                { loop: false },
            ),
        } 
    };

    static get GOLEM() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                4,
                { loop: false },
            ),
            'moveDown': new Animation(
                [[0, 0], [1, 0], [2, 0], [3, 0]],
                4,
            ),
            'moveRight': new Animation(
                [[0, 1], [1, 1], [2, 1], [3, 1]],
                4,
            ),
            'moveLeft': new Animation(
                [[0, 3], [1, 3], [2, 3], [3, 3]],
                4,
            ),
            'moveUp': new Animation(
                [[0, 2], [1, 2], [2, 2], [3, 2]],
                4,
            ),
            'special': new Animation(
                [[0, 6], [1, 6]],
                4,
                { loop: false },
            ),
        } 
    };

    static get CRAB() { 
        return {
            'idle': new Animation(
                [[0, 0]],
                4,
                { loop: false },
            ),
            'moveDown': new Animation(
                [[1, 0], [2, 0], [3, 0]],
                4,
            ),
            'moveRight': new Animation(
                [[1, 1], [2, 1], [3, 1]],
                4,
            ),
            'moveLeft': new Animation(
                [[1, 2], [2, 2], [3, 2]],
                4,
            ),
            'moveUp': new Animation(
                [[1, 3], [2, 3], [3, 3]],
                4,
            ),
            'special': new Animation(
                [[0, 5], [1, 5]],
                4,
                { loop: false },
            ),
        } 
    };

}

//AI
class EnemyAI extends AI {

    //State
    constructor(options) { 
        //Fix options & disable sleep
        if (typeof options !== 'object') options = {};
        options.canSleep = false;
        
        //Base AI
        super(options); 
    }

    //Actions (override)
    onClick() {
        //Alredy clicked
        if (this.state == AI.SPECIAL) return;

        //Play special animation
        this.setState(AI.SPECIAL);
    }

    //State: SPECIAL
    onEnd_special() {
        //Remove element from game
        this.character.element.remove();

        //Remove enemy from enemies list
        Game.enemies.remove(Game.enemies.indexOf(this.character))
    }

}

//Characters
class EnemyCharacter extends Character {

    //Enemy info
    #specie = '';
    get specie() { return this.#specie; }
    #color = 'Color';
    get color() { return this.#color; }
    
    //Position & Size
    _size = new Vec2(16, 24);


    //Constructor
    constructor(specie, color, options) {
        super(new EnemyAI(options));

        //Save enemy specie & color
        this.#specie = specie;
        this.#color = color;

        //Add classes to element
        this.element.classList.add('character');
        this.element.classList.add(this.specie);
        this.element.setAttribute('color', this.color);
        
        //Add enemy to enemies list
        Game.enemies.push(this);

        //Move towards random point
        this.ai.moveTowardsRandom();
    }

}

//Slime
class Slime extends EnemyCharacter {

    //Animations
    _animations = EnemyAnimations.SLIME;

    //Constructor
    constructor(color) { super('slime', color, { specialDuration: 0.4 * Game.fps }); }

}

//Bug
class Bug extends EnemyCharacter {

    //Position & Size
    _size = new Vec2(16);

    //Animations
    _animations = EnemyAnimations.BUG;

    //Constructor
    constructor(color) { super('bug', color, { specialDuration: 0.4 * Game.fps }); }

}

//Golem
class Golem extends EnemyCharacter {

    //Animations
    _animations = EnemyAnimations.GOLEM;

    //Constructor
    constructor(color) { super('golem', color, { specialDuration: 0.4 * Game.fps }); }

}

//Crab
class Crab extends EnemyCharacter {

    //Animations
    _animations = EnemyAnimations.CRAB;

    //Constructor
    constructor(color) { super('crab', color, { specialDuration: 0.4 * Game.fps }); }

}