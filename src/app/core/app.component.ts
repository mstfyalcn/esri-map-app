import { NgIf } from '@angular/common';
import { Component } from '@angular/core'; 
import { CardComponent } from 'app/core/components/card/card.component';
import { MapComponent } from 'app/core/components/map/map.component';
import { ListItemComponent } from './components/list-item/list-item/list-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent,CardComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTab = 'map'; 
}
