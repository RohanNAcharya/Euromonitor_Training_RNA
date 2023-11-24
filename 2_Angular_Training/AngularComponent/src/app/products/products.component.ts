import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
      
  }
  products = [
    {id: 1, name:"Apple Watch", price: "$99000", color: "Red", available: "Not Available", image: "assets/products/product-image-1.jpg"},
    {id: 2, name:"OnePlus 11R 5G", price: "$39999", color: "Sonic Black", available: "Available", image: "assets/products/product-image-2.webp"},
    {id: 3, name:"Converse Chuck Shoes", price: "$4990", color: "Black", available: "Available", image: "assets/products/product-image-3.jpg"},
    {id: 4, name:"NCT Hoodie Cherry Bomb", price: "$3990", color: "Black", available: "Not Available", image: "assets/products/product-image-4.webp"},
    {id: 5, name:"Rihanna LOUD Vinyl Record", price: "$15549", color: "Red", available: "Available", image: "assets/products/product-image-5.jpg"},
    {id: 6, name:"Blackpink The Album", price: "$13999", color: "Black", available: "Available", image: "assets/products/product-image-6.jpg"}
  ];
}
