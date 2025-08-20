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

//Array extension
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

//Functions
function randomExclusive(max) {
    //Random number from 0 to max exclusive
    return Math.floor(Math.random() * (max));
}

function randomInclusive(max) {
    //Random number from 0 to max inclusive
    return Math.floor(Math.random() * (max + 1));
}

function clamp(number, min, max) {
    //Clamp number between min a max
    return Math.min(Math.max(number, min), max);
}

function moveTowards(current, target, delta) {
    //Get distance
    const diff = target - current;
    const distance = Math.abs(diff);

    //Move towards target
    return (distance < delta ? target : current + diff / distance * delta)
}
