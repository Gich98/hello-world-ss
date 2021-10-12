import { Component } from "@angular/core";
import { CoursesService } from "./courses.service";

//Decorator per rendere questa classe un componente; Questo decorator include Injectable al suo interno
@Component({
    selector: 'courses',
    template: `
        <h2>{{ getTitle() }}</h2>
        <ul>
            <li *ngFor="let course of courses">
                {{ course }}
            </li>
        </ul>
        <img [src]="imageUrl"/>
        <table>
            <tr>
                <td [attr.colspan]="colSpan">test</td>
            </tr>
        </table>
        <button class="btn btn-primary" [class.active]="isActive" [style.backgroundColor]= "isActive ? 'blue' : 'white'">Save</button>
        <br/>
        <div (click)="onDivClicked()">
            <button (click)="onSave($event)">Test</button>
        </div>
        <br/>
        <input (keyup)="onKeyUp($event)"/>
        <br/>
        <input (keyup.enter)="onKeyUpAutomatic()"/>
        <br/>
        <input [value]="email" (keyup.enter)="getInputText()"/>
        <br/>
        <input [(ngModel)]="email" (keyup.enter)="getInputText()"/> <!--Serve per il 2 way binding, cioe' da component a view e viceversa-->
        <br/>
        {{course.title | uppercase | lowercase}}
        <br/>
        {{course.rating | number:'1.2-2'}}
        <br/>
        {{course.students | number}}
        <br/>
        {{course.price | currency:'EUR':'symbol':'3.2-2'}}
        <br/>
        {{course.releaseDate | date:'shortDate'}}
        <br/>
        {{customPipe | summary: 12 }} <!--summary e' una custom pipe-->
        `
})
export class CoursesComponent {
    title = "List of courses";
    courses;
    imageUrl = "";
    colSpan = 2;
    isActive = true;
    email = "me@example.com";

    course = {
        title: "The complete angular course",
        rating: 4.9745,
        students: 30123,
        price: 190.95,
        releaseDate: new Date(2016, 3, 1)
    }

    customPipe = "long text........................................................................."

    //service e' una dependency, cioe' Angular istanzia in automatico un oggetto di tipo CoursesService 
    //(Dependency Injection)
    constructor(service: CoursesService){
        this.courses = service.getCourses();
    }

    getTitle(){
        return this.title;
    }

    onSave($event: Event){
        $event.stopPropagation();//In questo modo si evita l'event bubbling e viene richiamato solo l'evento piu' interno
        console.log("Button was clicked", $event);
    }

    onDivClicked(){
        console.log("Div clicked");
    }

    onKeyUp($event: KeyboardEvent){
        if($event.key === "Enter") console.log("ENTER was pressed");
    }

    onKeyUpAutomatic(){
        console.log("ENTER was pressed");
    }

    getInputText(){
        console.log(this.email);
    }
}