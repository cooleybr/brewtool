import { Component } from '@angular/core';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brewtool';
  display = false;

  constructor(private d: DataService) {
    this.d.getIngredients();
  }

}
