import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  display = false;
  items: MenuItem[];

  constructor() { 
  }
 

  ngOnInit(): void {
    this.items = [
            {label: 'Home', icon: 'pi pi-fw pi-home', url: '/'},
            {label: 'Recipes', icon: 'pi pi-fw pi-file', url: 'recipes'},
            {label: 'Batches', icon: 'pi pi-fw pi-folder', url: 'batches'},
            {label: 'Metrics', icon: 'pi pi-fw pi-chart-line', url: 'metrics'}
        ];

  }

}
