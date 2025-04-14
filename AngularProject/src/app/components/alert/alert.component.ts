import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],//Exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on.
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
    //for alert message
    @Input() alertType: string='';
    @Input() status: string='';

    //for the button
    @Input() btnText: string='';
    @Input() btnClass: string='';

    //for the link
    @Input() linkText: string='';
    @Input() linkClass: string='';

    //emit custom events synchronously or asynchronously, and register handlers for those events by subscribing to an instance.
    @Output() onBtnClicked = new EventEmitter();
    onClick(){
      this.onBtnClicked.emit();//emit will trigger an event
    }
}
