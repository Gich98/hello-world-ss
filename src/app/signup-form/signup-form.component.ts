import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    account: new FormGroup({
    // il primo parametro e' il valore di default che possiamo inserire, 
    // il secondo e' un validator function,
    // il terzo e' un eventuale async validator
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ], 
    UsernameValidators.shouldBeUnique),
    password: new FormControl('', Validators.required)
    })
  });

  //Properties
  get username(){
    return this.form.get('account.username');
  }

  get password(){
    return this.form.get('account.password');
  }

  //Dovrebbe verificare username e password dal server ma per questo esempio imposto solo l'errore al form
  login(){
    this.form.setErrors({
      invalidLogin: true
    });
  }
}
