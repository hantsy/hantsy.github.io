import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TutorialsStore } from '../stores/tutorials.store';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './tutorials.page.html',
  styleUrls: ['./tutorials.page.css'],
})
export default class TutorialsPage {
  readonly store = inject(TutorialsStore);
}
