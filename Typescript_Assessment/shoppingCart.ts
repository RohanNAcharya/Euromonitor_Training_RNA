import { Products } from "./products";

export class ShoppingCart extends Products{
    public static cart = new Map<number, object>();

    public addItems(productId: number, quantity: number):void{
        let item = Products.products.find(product => product.productId === productId);
        if(item!['stock'] < quantity){
            console.log(`Quantity exceed the stock of ${item?.productName}!`);
        }
        else{
            if(ShoppingCart.cart.has(productId)){
                let myCart = ShoppingCart.cart.get(productId);
                myCart!['quantity'] += quantity;
                item!['stock'] -= quantity;
                myCart!['totalCost'] = myCart!['cost'] * myCart!['quantity']; 
                ShoppingCart.cart.set(productId, myCart!);
                console.log(`${quantity} ${myCart!['productName']} added to the cart!`);
            }
            else{
                let myCart = {
                    productId: productId,
                    productName: item!['productName'],
                    quantity: quantity,
                    cost: item!['cost'],
                    totalCost: item!['cost'] * quantity
                }
                ShoppingCart.cart.set(productId, myCart!);
                console.log(`${myCart!['quantity']} ${myCart!['productName']} added to the cart!`);
            }
        }
        this.viewCart();
    }

    public removeAnItem(productId:number, quantity:number):void{
        if(ShoppingCart.cart.has(productId)){
            let myCart = ShoppingCart.cart.get(productId);
            if(quantity >= myCart!['quantity']){
                ShoppingCart.cart.delete(productId);
                console.log(`${myCart!['productName']} removed from the cart!`);
            }
            else{
                myCart!['quantity'] -= quantity;
                myCart!['totalCost'] = myCart!['cost'] * myCart!['quantity'];
                console.log(`${quantity} ${myCart!['productName']} removed from the cart!`);
            }
        }
        else{
            console.log("The product with the entered id does not exist in the cart!");
        }
        this.viewCart();
    }

    public getTotalCost():void{
        let sum = 0;
        let slNo = 1;

        console.log("Items in cart:");
        ShoppingCart.cart.forEach((value, key) =>{ 
            sum += value['totalCost']; 
            console.log(`${slNo}. ${value['productName']} | Quantity: ${value['quantity']} | Cost:${value['totalCost']}`);
            slNo++;
        });
        console.log(`\nTotal Cost = $${sum}.00/-`);
    }

    public viewCart(): void {
        let slNo = 1;
        console.log("**********Your Cart**********");
        ShoppingCart.cart.forEach((value, key) =>{ 
            console.log(`${slNo}. ${value['productName']} | Product Id: ${value['productId']} | Quantity: ${value['quantity']} | Product Cost: ${value['cost']} | Total Cost:${value['totalCost']}`);
            slNo++;
        });
        console.log("\n");
    }
}



// let cart = new ShoppingCart();
// cart.addItems(1, 2);
// cart.addItems(1, 2);
// cart.addItems(5, 7);
// cart.addItems(5, 2);
// cart.addItems(3, 4);
// cart.removeAnItem(3, 2);
// cart.removeAnItem(10, 2);
// cart.getTotalCost();

