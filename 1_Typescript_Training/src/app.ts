interface IsPerson{
  name: string;
  age: number;
  speak(a: string): void;
  spend(a: number): number;
}

const me: IsPerson = {
  name: "Rohan",
  age: 23,
  speak(text: string): void{
    console.log(text);
  },
  spend(amount:number):number{
    console.log('I spent', amount);
    return amount;
  }
};

const greetPerson = (person:IsPerson) => {
  console.log('hello ', person.name);
}

// import { Invoice } from './classes/Invoice.js'

class Invoice{
  // readonly client: string;
  // private details: string;
  // public amount: number;

  // constructor(c: string, d: string, a: number){
  //   this.client = c;
  //   this.details = d;
  //   this.amount = a;
  // }

  constructor(
    readonly client: string, 
    private details: string, 
    public amount: number){}

  format(){
    return `${this.client} owes $${this.amount} for ${this.details}`;
  }
}

const invOne = new Invoice('mark', 'Work on the mario website', 250);

const invTwo = new Invoice('lucas', 'Work on the mario website', 300);

let invoices: Invoice[] = [];
invoices.push(invOne);
invoices.push(invTwo);

// console.log(invoices);

invoices.forEach(inv => {
  console.log(inv.client, inv.amount, inv.format());
});

const form = document.querySelector('.new-item-form') as HTMLFormElement;

// console.log(form.children);

//inputs
const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;


form.addEventListener('submit', (e:Event) =>{
  e.preventDefault();

  console.log(type.value, 
    tofrom.value,
    details.value,
    amount.value);
})