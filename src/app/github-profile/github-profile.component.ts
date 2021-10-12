import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  // constructor(private route: ActivatedRoute) { 

  // }

  // ngOnInit(): void {
  //   //Se siamo sicuri che l'utente vada su un'altra pagina e poi torni indietro
  //   //possiamo usare snapshot
  //   let id = this.route.snapshot.paramMap.get('id');

  //   //Serve per prendere il parametro impostato al link in app.module.ts
  //   // this.route.paramMap
  //   // .subscribe(params => {
  //   //  let id = params.get('id');
  //   //  console.log(id);
  //   // });
  // }

  constructor(private router: Router){

  }
  ngOnInit(){

  }

  //Navigazione programmatica
  submit(){
    this.router.navigate(['/followers'], {
      queryParams: {page: 1, order: 'newest'}
    })
  }

}
