import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent {
  @Input() cocktails: Array<Object> = [];

  constructor (private router: Router) {}

  onCocktailClick (id) {
    this.router.navigate(['/cocktail', id]);
  }
}
