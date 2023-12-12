import { ShoppingCart } from "./shoppingCart";
import * as readline from 'readline'; 


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class mainShopping{
    public options:string;
    constructor(){
        this.options = "1. View All Products.\n2. Add an item to the cart.\n3. Remove an item from the cart.\n4. View my cart.\n5. Get Total Cost\n6.Exit\nEnter your choice:";
    }

    public async getUserInput():Promise<void>{
        let userChoice = await this.question(this.options);
        let cart = new ShoppingCart();
        if(userChoice == '1'){
            cart.viewProducts();
        }
        if(userChoice == '2'){
            let productId = await this.question("Enter the product id:");
            let quantity = await this.question("Enter the product quantity:");
            cart.addItems(Number(productId), Number(quantity));
        }else if(userChoice == '3'){
            let productId = await this.question("Enter the product id:");
            let quantity = await this.question("Enter the product quantity:");
            cart.removeAnItem(Number(productId), Number(quantity));
        }else if(userChoice == '4'){
            cart.viewCart();
        }else if(userChoice == '5'){
            cart.getTotalCost();
        }else if(userChoice == '6'){
            process.exit(0);
        }else{
            console.log("Invalid Input!!");
        }
        this.getUserInput();
    }

    public question(question:string):Promise<string>{
        return new Promise((resolve) => {
            rl.question(question, resolve);
        });
    }
}

let myCart = new mainShopping();
myCart.getUserInput();