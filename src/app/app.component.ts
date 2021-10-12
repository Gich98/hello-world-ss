import { Component } from '@angular/core';
import { FavoriteChangedEventArgs } from './favorite/favorite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  canSave = true;

  task = {
    title: 'Review applications',
    assignee: {
      name: 'John Smith'
    } 
  }

  courses = [1, 2];

  coursesObject: any;

  viewMode = 'map';

  post = {
    title: "Title",
    isFavorite: true
  }

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs){
    console.log("Favorite changed: ", eventArgs);
  }

  onAdd(){
    this.coursesObject.push({id: 4, name: 'course4'});
  }

  onRemove(course: any){
    let index = this.coursesObject.indexOf(course);
    this.coursesObject.splice(index, 1); //Rimuove l'item corrispondente
  }

  onChange(course: any){
    course.name = 'Updated';
  }

  loadCourses(){
    this.coursesObject = [
      {id: 1, name: 'course1'},
      {id: 2, name: 'course2'},
      {id: 3, name: 'course3'}
    ];
  }

  //Serve per la funzione trackBy da html; in questo modo anche ripremendo il bottone non vengono ricaricati i corsi in memoria
  trackCourse(index: number, course: any){
    return course ? course.id : undefined;
  }

}
