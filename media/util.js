//Util
function random(max) {
  //Random number from 0 to max inclusive
  return Math.floor(Math.random() * (max + 1));
}

function clamp(number, min, max) {
  //Clamp number between min a max
  return Math.min(Math.max(number, min), max);
}

function moveTowards(current, target, delta) {
  const diff = target - current;
  const distance = Math.abs(diff);
  if (distance < delta)
    return target;
  else
    return current + diff / distance * delta;
}

class Vec2 {
  x = 0
  y = 0

  constructor(x, y) {
    this.x = typeof x == 'number' ? x : 0;
    this.y = typeof y == 'number' ? y : this.x;
  }

  clone() {
    return new Vec2(this.x, this.y)
  }

  add(n) {
    if (typeof n === 'object')
      return new Vec2(this.x + n.x, this.y + n.y)
    else
      return new Vec2(this.x + n, this.y + n)
  }

  sub(n) {
    if (typeof n === 'object')
      return new Vec2(this.x - n.x, this.y - n.y)
    else
      return new Vec2(this.x - n, this.y - n)
  }

  mult(n) {
    if (typeof n === 'object')
      return new Vec2(this.x * n.x, this.y * n.y)
    else
      return new Vec2(this.x * n, this.y * n)
  }

  div(n) {
    if (typeof n === 'object')
      return new Vec2(this.x / n.x, this.y / n.y)
    else
      return new Vec2(this.x / n, this.y / n)
  }

  toInt() {
    return new Vec2(Math.floor(this.x), Math.floor(this.y))
  }
}

class Timer {
  #active = false;
  #end = 0;
  
  constructor() {}

  get justFinished() { return this.#active && game.frames == this.#end; }
  get finished() { return this.#active && game.frames >= this.#end; }

  count(frames) { 
    this.#active = true;
    this.#end = game.frames + frames; 
  }

  reset() {
    this.#active = false;
  }
}