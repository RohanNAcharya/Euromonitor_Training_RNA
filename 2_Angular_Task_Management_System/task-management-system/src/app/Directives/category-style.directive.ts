import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCategoryStyle]'
})
export class CategoryStyleDirective implements OnInit{
   categoryColorMap: { [key: string]: string } = {
    "General": "#80bfff",
    "Work": "#8080ff",
    "Shopping": "#ff80ff",
    "Study": "#ff8080",
    "Hobby": "#d5ff80",
    "Family": "#ffff80",
    "Friends": "#df80ff",
    "Party": "#ffd480",
    "Other": "#b3cccc"
  };

  constructor(private element:ElementRef, private renderer: Renderer2) { }
  
  ngOnInit(){
    const trimmedText = this.element.nativeElement.textContent.trim();
    console.log(trimmedText);
    const color = this.categoryColorMap[trimmedText];
    console.log(color);

    if (color) {
      this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', color);
      console.log("Enters here");
    }
  }
}
