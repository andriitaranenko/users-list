import { NgFor, NgForOf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

interface ITableColumn<T> {
  definition: string;
  name: string;
  data: (data: T) => string,
  action: (data: T) => void
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgForOf, UpperCasePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> {
  selectedIndex: number = -1;
  selectUser(index: number) {
    this.selectedIndex = index
  }

  @Input() columns: ITableColumn<T>[] = [];

  @Input() data: T[] = [];
}
