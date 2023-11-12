var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape1 = /** @class */ (function () {
    function Shape1() {
    }
    Shape1.prototype.printDescription = function () {
        console.log("This is a shape.");
    };
    return Shape1;
}());
var Circle1 = /** @class */ (function (_super) {
    __extends(Circle1, _super);
    function Circle1(radius) {
        var _this = _super.call(this) || this;
        _this.radius = radius;
        return _this;
    }
    Circle1.prototype.calculateArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    return Circle1;
}(Shape1));
var Rectangle1 = /** @class */ (function (_super) {
    __extends(Rectangle1, _super);
    function Rectangle1(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Rectangle1.prototype.calculateArea = function () {
        return this.width * this.height;
    };
    return Rectangle1;
}(Shape1));
var circle1 = new Circle1(5);
var rectangle1 = new Rectangle1(4, 6);
console.log("Circle Area:", circle1.calculateArea());
console.log("Rectangle Area:", rectangle1.calculateArea());
circle1.printDescription();
rectangle1.printDescription();
