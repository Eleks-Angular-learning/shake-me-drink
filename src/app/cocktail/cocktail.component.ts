import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {

  @Input() cocktail;

  constructor() { }

  ngOnInit() {
  }

}
