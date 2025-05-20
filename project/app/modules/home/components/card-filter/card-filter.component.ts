import { Component, inject, signal } from '@angular/core';
import { userFilter } from '../../../../shared/models/user-filter.type';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardFilterService } from '../../services/card-filter/card-filter.service';

@Component({
  selector: 'app-card-filter',
  imports: [DragDropModule],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.css'
})
export class CardFilterComponent {
  cardFilterService = inject(CardFilterService)
  filterList = signal<Array<userFilter>>([]);

  getValidFilterOptions(filter: userFilter) {
    var keys = Object.keys(filter) as Array<keyof userFilter>;
  
    var valid = [];
    for (let index = 2; index < keys.length; index++) {
      const key = keys[index];
      const propValue = filter[key];

       if (propValue != null && propValue !== '') {
          valid.push({ key: key, value: propValue });
       }
    }
    return valid;
  }

  ngOnInit():void {
    this.filterList.set(this.cardFilterService.getUserFilters())
  }

  drop(event: CdkDragDrop<userFilter[]>) {
    this.filterList.update(list => {
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      return list;
    })
  }
}
