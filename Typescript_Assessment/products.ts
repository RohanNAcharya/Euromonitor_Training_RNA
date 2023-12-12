export class Products{
    public static products = [
        {
            productId: 1,
            productName: "Smartphone",
            stock: 10,
            cost: 15000
        },
        {
            productId: 2,
            productName: "Smart Watch",
            stock: 15,
            cost: 6000
        },
        {
            productId: 3,
            productName: "Smart TV",
            stock: 5,
            cost: 50000
        },
        {
            productId: 4,
            productName: "Washining Machine",
            stock: 10,
            cost: 25000
        },
        {
            productId: 5,
            productName: "Refrigerator",
            stock: 6,
            cost: 35000
        },
        {
            productId: 6,
            productName: "Clock",
            stock: 7,
            cost: 1000
        }
    ]

    public viewProducts():void{
        Products.products.forEach(product => {
            console.log(`Product ID: ${product.productId} | Product Name: ${product.productName} | Stock: ${product.stock} | Price: $${product.cost}.00`)
        })
    }
}