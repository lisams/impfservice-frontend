import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class VaccinationValidators {

  static checkDate() {

      return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = control.value > new Date();
        return forbidden ? {forbiddenName: {value: control.value}} : null;
      };

  }
}
