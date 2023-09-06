import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidators } from '../../form-validators';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss'],
})
export class ErrorMsgComponent {
  @Input() control!: FormControl;
  @Input() label!: any;

  get errorMsg() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return FormValidators.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
