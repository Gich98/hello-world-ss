import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { map } from 'rxjs/operators'

export class DataService {

    constructor(private url: string, private http: HttpClient) {
       
    }

    getAll() {
        return this.http.get(this.url)
            .pipe(
                map(response => {return response}), 
                catchError(this.errorHandler));
    }

    create(resource: any) {
        return this.http.post(this.url, JSON.stringify(resource))
            .pipe(
                map(response => {return response}),
                catchError(this.errorHandler));
    }

    update(resource: any) {
        return this.http.patch(this.url + '/' + resource, JSON.stringify({ isread: true }))
            .pipe(
                map(response => {return response}),
                catchError(this.errorHandler));
    }

    delete(resource: any) {
        return this.http.delete(this.url + '/' + resource)
            .pipe(
                map(response => {return response}),
                catchError(this.errorHandler));
    }

    private errorHandler(error: HttpErrorResponse) {
        if (error.status === 404) {
            return throwError(new NotFoundError());
        } else if (error.status === 400) {
            return throwError(new BadInput(JSON.parse(JSON.stringify(error))))
        }
        return throwError(new AppError(JSON.parse(JSON.stringify(error))));
    }

}
