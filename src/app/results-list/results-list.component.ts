import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent {
  @Input() cocktails: Array<Object> = [];
}
