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
        this.setState(PetAI.SPECIAL);
    }

    //State: MOVING or MOVING_BALL
    onUpdate_moveball() {
        //Try to move
        if (this._moveTowardsMovePos()) return;

        //Didn't move -> Point reached

        //Notify game that the ball was reached
        Game.ball.onReached()

        //Set mood to heart & show mood
        this.#setHeartMood()
        this.showMood();

        //Animate special
        this.setState(PetAI.SPECIAL);
    }

}

//Characters
class PetCharacter extends Character {

    //Pet info
    #name = 'Pet';
    get name() { return this.#name; }
    #specie = '';
    get specie() { return this.#specie; }
    #color = 'Pet';
    get color() { return this.#color; }
    
    //Animations
    _animations = PetAnimations.DEFAULT;


    //State
    constructor(name, color, specie, options) {
        super(new PetAI(options));

        //Save pet name, color & specie
        this.#name = name;
        this.#color = color;
        this.#specie = specie;

        //Add classes to element
        this.element.classList.add('pet');
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
    constructor(name, color, specie, options) { super(name, color, specie, options); }

}


 /*$$$$$$             /$$
| $$__  $$           | $$
| $$  \ $$ /$$$$$$  /$$$$$$   /$$$$$$$
| $$$$$$$//$$__  $$|_  $$_/  /$$_____/
| $$____/| $$$$$$$$  | $$   |  $$$$$$
| $$     | $$_____/  | $$ /$$\____  $$
| $$     |  $$$$$$$  |  $$$$//$$$$$$$/
|__/      \_______/   \___/ |______*/

//Pets (cat)
class Cat extends PetCharacter {

    //Animations
    _animations = PetAnimations.CAT;

    //Constructor
    constructor(name, color) { super(name, color, 'cat'); }

}

//Pets (dog)
class Dog extends PetCharacter {

    //Animations
    _animations = PetAnimations.DOG;

    //Constructor
    constructor(name, color) { super(name, color, 'dog'); }
    
}

//Pets (tutle)
class Turtle extends PetCharacter {

    //Animations
    _animations = PetAnimations.TURTLE;

    //Constructor
    constructor(name, color) { super(name, color, 'turtle'); }

}

//Pets (dino)
class Dino extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.DINO;

    //Constructor
    constructor(name, color) { super(name, color, 'dino'); }

}

//Pets (duck)
class Duck extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.DUCK;

    //Constructor
    constructor(name, color) { super(name, color, 'duck'); }

}

//Pets (raccoon)
class Raccoon extends PetCharacter {

    //Animations
    _animations = PetAnimations.RACCOON;

    //Constructor
    constructor(name, color) { super(name, color, 'raccoon', { canSleep: false }); }

}

//Pets (goat, sheep, ostrich, pig)
class Goat extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, color, 'goat'); }

}

class Sheep extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, color, 'sheep'); }

}

class Ostrich extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, color, 'ostrich'); }

}

class Pig extends PetCharacter {

    //Constructor
    constructor(name, color) { super(name, color, 'pig'); }

}

//Pets (rabbit)
class Rabbit extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.RABBIT;

    //Constructor
    constructor(name, color) { super(name, color, 'rabbit'); }

}

//Pets (chicken)
class Chicken extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.CHICKEN;

    //Constructor
    constructor(name, color) { super(name, color, 'chicken'); }

}

//Pets (cow)
class Cow extends PetCharacter {

    //Animations
    _animations = PetAnimations.COW;

    //Constructor
    constructor(name, color) { super(name, color, 'cow'); }

}

//Pets (junimo)
class Junimo extends PetCharacterSmall {

    //Animations
    _animations = PetAnimations.JUNIMO;

    //Constructor
    constructor(name, color) { super(name, color, 'junimo'); }

}