class Hero{
  hunger: number;
  health: number;

  attack(){
    console.log("I am attacking");
  }
  eat(){
    console.log("I am eating");
  }
  sleep(){
    console.log("I am sleeping");
  }
}

class Archer extends Hero{
  arrows: number;

  attack(){
    super.attack();
    console.log("I am firing arrows");
    this.arrows--;
  }
}

class Mage extends Hero{
  mana: number;

  attack(){
    super.attack();
    console.log("I am throwing portions");
    this.mana--;
  }
}

class Knight extends Hero{
  shield: number;

  attack(){
    super.attack();
    console.log("I am swining with the sword");
  }
}

class Wizard extends Mage{}
class Witch extends Mage{}

class Tribe{
  private heros: Hero[];

  setHeros(heros:Hero[]){
    this.heros = heros;
  }

  attack():void{
    for(let hero of this.heros){
        hero.attack();
    }
  }
}


const archer: Hero = new Archer();
const mage: Hero = new Mage();
const knight: Hero = new Knight();
const wizard: Wizard = new Wizard();
const witch: Witch = new Witch();

const heros: Hero[] = [archer, mage, knight];

const tribe = new Tribe();
tribe.setHeros(heros);
tribe.attack();

class Thief extends Hero{
  attack(){
    super.attack();
    console.log("Pick Pocket");
  }
}

const thief = new Thief();
const heros2: Hero[] = [knight, thief, mage];
const tribe2 = new Tribe();
tribe2.setHeros(heros2);

