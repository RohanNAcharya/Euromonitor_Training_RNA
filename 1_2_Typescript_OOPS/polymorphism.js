"use strict";
class Hero {
    attack() {
        console.log("I am attacking");
    }
    eat() {
        console.log("I am eating");
    }
    sleep() {
        console.log("I am sleeping");
    }
}
class Archer extends Hero {
    attack() {
        super.attack();
        console.log("I am firing arrows");
        this.arrows--;
    }
}
class Mage extends Hero {
    attack() {
        super.attack();
        console.log("I am throwing portions");
        this.mana--;
    }
}
class Knight extends Hero {
    attack() {
        super.attack();
        console.log("I am swining with the sword");
    }
}
class Wizard extends Mage {
}
class Witch extends Mage {
}
class Tribe {
    setHeros(heros) {
        this.heros = heros;
    }
    attack() {
        for (let hero of this.heros) {
            hero.attack();
        }
    }
}
const archer = new Archer();
const mage = new Mage();
const knight = new Knight();
const wizard = new Wizard();
const witch = new Witch();
const heros = [archer, mage, knight];
const tribe = new Tribe();
tribe.setHeros(heros);
tribe.attack();
class Thief extends Hero {
    attack() {
        super.attack();
        console.log("Pick Pocket");
    }
}
const thief = new Thief();
const heros2 = [knight, thief, mage];
const tribe2 = new Tribe();
tribe2.setHeros(heros2);
