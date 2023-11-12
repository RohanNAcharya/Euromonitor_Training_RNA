class Person{
    public name;string;

    constructor(name: string){
        this.name = name;
    }
}

class BankAccount{
    private balance: number;

    constructor(initialBalance: number){
        this.balance = initialBalance;
    }

    getBalance(): number{
        return this.balance;
    }
}

class Vehicle{
    protected speed: number;

    constructor(speed:number){
        this.speed = speed;
    }
}


class Car extends Vehicle{
    constructor(speed: number){
        super(speed);
    }

    getSpeed(): number{
        return this.speed;
    }

    printSpeed(): void{
        console.log(`${this.speed}`);
    }
}


const person = new Person("Jhon");
console.log(person.name);

const account = new BankAccount(1000);
// console.log(account.balance);

const car = new Car(60);
car.printSpeed();
