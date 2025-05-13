import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Item } from 'app/core/models/Item';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
 //silinecek itemi üst cmpden aldık
  @Input() item!: Item;
  //delete eventini üst cmp'ye bildirdik
  @Output() deleted = new EventEmitter<number>();

  //silme işlemimizi gelen iteem ile yaptık
  delete() {
    this.deleted.emit(this.item.id);
  }
}