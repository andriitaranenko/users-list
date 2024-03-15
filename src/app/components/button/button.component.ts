import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = '';

  @Input() color: 'default' | 'alert' = 'default';

  @Input() isDisabled: boolean = false;
}
