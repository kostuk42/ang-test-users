import {UserService} from "../services/user.service";
import {AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors} from "@angular/forms";
import {catchError, Observable, of, switchMap} from "rxjs";

export function uniqueUsernameValidator(userService: UserService, currentUserId: any): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return userService.getUsers().pipe(
      switchMap(users => {
        const isUsernameTaken = users.some(user => user.username === control.value && user.id !== currentUserId)
        return isUsernameTaken ? of({ uniqueUsername: true }) : of(null);
      }),
      catchError(() => {
        return of(null);
      })
    );
  };
}

export function passwordStrengthValidator(control: FormControl): ValidationErrors | null {
  const value = control.value || '';
  const hasNumber = /[0-9]/.test(value);
  const hasLetter = /[a-zA-Z]/.test(value);
  if (!hasLetter || !hasNumber || value.length < 8) {
    return { passwordStrength: true };
  }
  return null;
}

export function passwordMatchValidator(g: AbstractControl) {
  return g.get('password')!.value === g.get('repeatPassword')!.value
    ? null : { 'mismatch': true };
}
