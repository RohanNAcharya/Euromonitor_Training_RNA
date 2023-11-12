abstract class Character{
  hunger:number;
  health:number;

  abstract eat():void;
}

interface Hero2 extends Character{
  heroId:number
}

interface Enemy extends Character{
  enemyId:number;
}

class Spy implements Hero2, Enemy{
  hunger: number;
  health: number;
  heroId: number;
  enemyId: number;

  eat(){
    this.hunger -= 1;
  }
}


const hero2: Hero2 = new Spy();
const enemy: Enemy = new Spy();