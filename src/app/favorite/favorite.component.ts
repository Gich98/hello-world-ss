import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  styles: [//E' un altro modo per caricare il css. Lo stile che viene caricato per ultimo e' quello effettivo che viene utilizzato 
    `
    .glyphicon {
      color: green;
    }
    `
  ],
  //encapsulation: ViewEncapsulation.Emulated //ViewEncapsulation e' un enum definito in angular core; "emulated" va ad emulare lo shadowDOM
  //Lo Shadow DOM serve all’incapsulamento e permette al componente di avere il proprio DOM “shadow”, al quale il documento principale non può accedere nemmeno accidentalmente. 
  //Inoltre può avere regole di stile con scope locale e molto altro ancora.
})
export class FavoriteComponent {

  @Input('isFavorite') isSelected: boolean = false;

  @Output('changeAlias') change = new EventEmitter(); //Deve avere lo stesso nome dell'evento

  onClick(){
    this.isSelected = !this.isSelected;

    //Notifica che qualcosa e' successo; il parametro viene passato all'event in app.component.html poi in app.component.ts
    this.change.emit({ newValue: this.isSelected }); 
  }

}

//Interfaccia usata in app.component.ts
export interface FavoriteChangedEventArgs {
  newValue: boolean;
}
