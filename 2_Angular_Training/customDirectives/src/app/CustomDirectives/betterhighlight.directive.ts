import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterhighlight]'
})
export class BetterhighlightDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { 

  }

  @HostBinding('style.background') background: string = 'yellow';
  @HostBinding('style.border') border: string = 'none';

  @HostListener('mouseenter') mouseenter(){
    this.background = 'pink';
    this.border = 'red 2px solid'
  }

  @HostListener('mouseleave') mouseleave(){
    this.background = 'yellow';
    this.border = 'none'
  }

}
