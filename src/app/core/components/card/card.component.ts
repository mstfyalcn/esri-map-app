import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; 
import { ListItemComponent } from '../list-item/list-item/list-item.component';
import { FakeDataService } from 'app/core/services/fake-data.service';
import { Item } from 'app/core/models/Item';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  standalone: true,
  //standalone true old için module ve cmp importlarımızı burada yaptık
  imports: [CommonModule, CardModule, ListItemComponent,ButtonModule],
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
  title = 'Görev Kartı';
  //temsili Item modeli eklendi
  items: Item[] = [];
  //loading default false kontrolü ekledik
  loading = false;
  errorMessage = 'Test';

  constructor(private dataService: FakeDataService) {}

  ngOnInit() {
    this.loadItems();
  }
//itemlarımız yükleniyor
  loadItems() {
    this.loading = true;
     
    this.dataService.getItems().subscribe({
      next: list => {
        this.items = list;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }
//yeni item card cmp'den yapılıyor, hata controlü de yapılıyor
  addNewItem() {
  
    this.dataService.addItem(`Yeni-${Math.random().toString(36).substring(2, 6)}`)
      .subscribe({
        next: item => this.items.push(item),
        error: err => this.errorMessage = err.message
      });
      console.log(this.items)
  }
//delete işlemi list item cmp üzerinden yapılıyor, hata controlü yapılıyor
  onItemDeleted(id: number) {
     
    this.dataService.deleteItem(id).subscribe({
      next: () => this.items = this.items.filter(i => i.id !== id),
      error: err => this.errorMessage = err.message
    });
  }
}
