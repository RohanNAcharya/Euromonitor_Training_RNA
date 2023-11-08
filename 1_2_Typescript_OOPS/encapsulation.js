"use strict";
class Player {
    setHealth(health) {
        this.health = health;
    }
    getHealth() {
        return this.health;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    getSpeed() {
        return this.speed;
    }
}
const mario = new Player();
mario.setHealth(10);
mario.setSpeed(7);
console.log(`Mario has ${mario.getHealth()}/10 health.`);
console.log(`Mario has speed ${mario.getSpeed()}`);
