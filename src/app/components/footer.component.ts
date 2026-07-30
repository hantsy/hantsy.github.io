import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatDividerModule],
  template: `
    <footer class="footer">
      <mat-divider></mat-divider>
      <p style="margin-top: 1rem;">
        &copy; {{ year }} Hantsy Bai. Powered by Angular &amp; Angular Material.
      </p>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
