"use strict";
class Hero1 {
    eat() {
        console.log("I am eating");
    }
    sleep() {
        console.log("I am sleeping");
    }
}
class Archer1 extends Hero1 {
    attack() {
        console.log("I am firing arrows");
        this.arrows--;
    }
}
class Knight1 extends Hero1 {
    attack() {
        console.log("I am swining with the sword");
    }
}
class Mage1 extends Hero1 {
    constructor() {
        super(...arguments);
        this.mana = 10;
    }
}
class Wizard1 extends Mage1 {
    attack() {
        console.log(`${this.mana - 1}, Attacked with Portions`);
    }
}
class Witch1 extends Mage1 {
    attack() {
        console.log(`${this.mana - 2}, Attacked with Portions`);
    }
}
const archerOnj = new Archer1();
const knightObj = new Knight1();
