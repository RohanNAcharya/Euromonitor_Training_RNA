class Player{
    private health:number;
    private speed:number;

    setHealth(health:number){
        this.health = health;
    }

    getHealth(){
        return this.health;
    }

    setSpeed(speed:number){
        this.speed = speed;
    }

    getSpeed(){
        return this.speed;
    }
}

const mario = new Player();
mario.setHealth(10);
mario.setSpeed(7);

console.log(`Mario has ${mario.getHealth()}/10 health.`);
console.log(`Mario has speed ${mario.getSpeed()}`);