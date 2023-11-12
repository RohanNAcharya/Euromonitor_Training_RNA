"use strict";
class Character {
}
class Spy {
    eat() {
        this.hunger -= 1;
    }
}
const hero2 = new Spy();
const enemy = new Spy();
