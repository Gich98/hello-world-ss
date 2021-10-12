import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;

  //Meglio lasciare il costruttore il piu' leggero possibile e inserire le operazioni in ngOnInit
  constructor(private service: PostService) { //Meglio creare un servizio separato che facilita il testing
   
  }

  //Primo metodo del Lifecycle hooks del componente
  ngOnInit(){
    this.service.getAll()
    .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement){
    let post: any = { title: input.value};
    //splice serve per inserire l'oggetto in punto preciso della lista; il primo parametro indica la posizione
    //in cui lo si vuole inserire; il secondo indica il numero di elementi da eliminare; il terzo
    //indica l'oggetto da inserire.
    this.posts.splice(0, 0, post); 

    input.value = "";

    this.service.create(post)
    .subscribe(newPost => {
      //transformare prima response in stringa, poi in json, poi si possono prendere i dati
      post['id'] = JSON.parse(JSON.stringify(newPost)).id;
      console.log(post);
    }, (error: AppError) =>{
      //Elimina il primo elemento 
      this.posts.splice(0, 1);

      if(error instanceof BadInput)
        alert('Errore 400');
       //Esempio in form: this.form.setErrors(error.originalError);
      else{
        throw error; //Serve per farlo rilevare dall'handler globale
      }
    });
  }

  updatePost(post: any){
    //patch si usa per modificare solo alcune proprieta' di un oggetto
    this.service.update(post.id)
    .subscribe(updatedPost => {
      console.log(updatedPost);
    });
    //put si usa per modificare l'intero oggetto
    //this.http.put(this.url, JSON.stringify(post));
  }

  deletePost(post: any){
    let index = this.posts.indexOf(post);
    //In questo caso lo splice viene utilizzato per eliminare l'oggetto nella posizione index
    this.posts.splice(index, 1);
    
    this.service.delete(post.id)
    .subscribe(() => {
      
    }, (error: AppError) => {
      //Riaggiungo il post
      this.posts.splice(index, 0, post);
      if(error instanceof NotFoundError)
        alert("Post già eliminato!");
      else{
        throw error;
      }
    });
  }

}
