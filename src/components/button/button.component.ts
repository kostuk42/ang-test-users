import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() textButton: string = 'Click me';
  @Input() backgroundColor: any = 'blue';
}
