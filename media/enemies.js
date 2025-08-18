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


 /*$$$$$$$                                   /$$
| $$_____/                                  |__/
| $$       /$$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$  /$$$$$$   /$$$$$$$
| $$$$$   | $$__  $$ /$$__  $$| $$_  $$_  $$| $$ /$$__  $$ /$$_____/
| $$__/   | $$  \ $$| $$$$$$$$| $$ \ $$ \ $$| $$| $$$$$$$$|  $$$$$$
| $$      | $$  | $$| $$_____/| $$ | $$ | $$| $$| $$_____/ \____  $$
| $$$$$$$$| $$  | $$|  $$$$$$$| $$ | $$ | $$| $$|  $$$$$$$ /$$$$$$$/
|________/|__/  |__/ \_______/|__/ |__/ |__/|__/ \_______/|______*/

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