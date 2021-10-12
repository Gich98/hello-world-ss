import { Injectable } from '@angular/core';

//Decorator da aggiungere solo se questo service ha dipendenze nel suo constructor
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
}
