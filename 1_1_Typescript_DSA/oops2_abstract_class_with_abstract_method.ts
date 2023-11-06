abstract class Shape {
    abstract calculateArea(): number;
  }
  
  class Circle extends Shape {
    constructor(private radius: number) {
      super();
    }
  
    calculateArea(): number {
      return Math.PI * this.radius ** 2;
    }
  }
  
  class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
      super();
    }
  
    calculateArea(): number {
      return this.width * this.height;
    }
  }
  
  const circle = new Circle(5);
  const rectangle = new Rectangle(4, 6);
  
  console.log("Circle Area:", circle.calculateArea());       
  console.log("Rectangle Area:", rectangle.calculateArea()); 
  