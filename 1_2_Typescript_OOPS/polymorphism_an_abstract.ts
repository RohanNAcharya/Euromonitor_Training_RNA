abstract class Hero1{
  hunger: number;
  health: number;

  abstract attack():void;

  eat(){
    console.log("I am eating");
  }
  sleep(){
    console.log("I am sleeping");
  }
}

class Archer1 extends Hero1{
  arrows: number;

  attack(){
    console.log("I am firing arrows");
    this.arrows--;
  }
}

class Knight1 extends Hero1{
  shield: number;

  attack(){
    console.log("I am swining with the sword");
  }
}


abstract class Mage1 extends Hero1{
  mana:number = 10;
} 

class Wizard1 extends Mage1{
  attack(){
    console.log(`${this.mana-1}, Attacked with Portions`);
  }
}

class Witch1 extends Mage1{
  attack(){
    console.log(`${this.mana-2}, Attacked with Portions`);
  }
}

const archerOnj: Archer1 = new Archer1();
const knightObj: Knight1 = new Knight1();
