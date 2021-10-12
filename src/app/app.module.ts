import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './courses.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SummaryPipe } from './summary.pipe';
import { FavoriteComponent } from './favorite/favorite.component';
import { PanelComponent } from './panel/panel.component';
import { InputFormatDirective } from './input-format.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    CoursesComponent,
    CourseComponent,
    SummaryPipe,
    FavoriteComponent,
    PanelComponent,
    InputFormatDirective,
    ContactFormComponent,
    NewCourseFormComponent,
    PostsComponent,
    NavbarComponent,
    HomeComponent,
    GithubProfileComponent,
    GithubFollowersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //Serve per il two way binding, cioe' da component a view e viceversa
    ReactiveFormsModule, //Serve per creare form reactive
    HttpClientModule,
    RouterModule.forRoot([ //si passa un array di route, l'ordine è importante. forRoot è un metodo statico
      {
        path: '', //Questo è il primo componente che viene caricato
        component: HomeComponent
      }, 
      {//Le route più specifiche si mettono prima
        path: 'followers/:id/:username',  //id e username sono parametri che saranno passati a run-time
        component: GithubProfileComponent
      },
      {
        path: 'followers', 
        component: GithubFollowersComponent
      },
      {
        path: 'posts', 
        component: PostsComponent
      },
      {
        path: '**', //caratteri jolly, in questo caso qualsiasi altro link diverso da quelli inseriti sopra
        component: NotFoundComponent
      }
    ])
  ],
  providers: [ //Inserire le dipendenze qui; serve per il Dependency Injection
    CoursesService, //Angular crea un'unica istanza per tutto il modulo (Singleton)
    PostService,
    {provide: ErrorHandler, useClass: AppErrorHandler} //Ovunque ci sia la classe ErrorHandler viene sostituita con AppErrorHandler
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
