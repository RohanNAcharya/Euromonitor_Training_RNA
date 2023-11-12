abstract class Shape1 {
    abstract calculateArea(): number;
  
    printDescription(): void {
      console.log("This is a shape.");
    }
  }
  
  class Circle1 extends Shape1 {
    constructor(private radius: number) {
      super();
    }
  
    calculateArea(): number {
      return Math.PI * this.radius ** 2;
    }
  }
  
  class Rectangle1 extends Shape1 {
    constructor(private width: number, private height: number) {
      super();
    }
  
    calculateArea(): number {
      return this.width * this.height;
    }
  }
  
  const circle1 = new Circle1(5);
  const rectangle1 = new Rectangle1(4, 6);
  
  console.log("Circle Area:", circle1.calculateArea());
  console.log("Rectangle Area:", rectangle1.calculateArea());
  circle1.printDescription();    
  rectangle1.printDescription(); 