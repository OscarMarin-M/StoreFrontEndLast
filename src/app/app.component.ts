import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeComponentsModule } from './prime-components/prime-components.module';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimeComponentsModule, RouterLink,MatIconModule, MatBadgeModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'tutorialcrud';
  counter: number =  0;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.getCounter().subscribe((counter: number) => {
      this.counter = counter;
    });
  }
  getCounter(){
    if(this.counter > 9){
      return "+9";
    }else{
      if(this.counter === 0)
        return "";
      else {return ""+this.counter;}
    }
  }
}
