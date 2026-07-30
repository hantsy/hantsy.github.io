import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ year }} Hantsy Bai. Powered by <a href="https://analogjs.org" target="_blank" rel="noopener">Angular + Analog</a>.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
