import { NgFor, NgForOf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ITableColumn } from '../../models/table.models';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgForOf, UpperCasePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> {
  private _selectedIndex: number = -1;

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  selectTableRow(index: number): void {
    this._selectedIndex = index;
  }

  @Input() columns: ITableColumn<T>[] = [];

  @Input() data: T[] = [];
}
