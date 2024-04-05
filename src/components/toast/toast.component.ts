import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  @Input() message = ''
  @Input() status: 'success' | 'error' = 'success';

}
