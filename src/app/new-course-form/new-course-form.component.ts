import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent{
  
  form;

  //Metodo alternativo per creare un form, cioe' si usa FormBuilder con injection nel costruttore
  constructor(fb: FormBuilder){
    this.form = fb.group({
      name: ['', Validators.required],
      contact: fb.group({
        email: [],
        phone: []
      }),
      topics: fb.array([])
    });
  }

  addTopic(topic: HTMLInputElement){
    this.topics.push(new FormControl(topic.value));
    topic.value = '';
  }

  get topics(){
    return this.form.get('topics') as FormArray;
  }

  removeTopic(topic: AbstractControl){
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }

}
