import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeComponentsModule } from './prime-components/prime-components.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimeComponentsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tutorialcrud';
}
