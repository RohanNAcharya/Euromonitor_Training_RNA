import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[setBackground]'
})
export class setBackgroundColorDiective{
    element!: ElementRef;
    constructor(element: ElementRef){
        element.nativeElement.style.backgroundColor = '#C8E6C9';
    }
}