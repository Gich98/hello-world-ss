import { Pipe, PipeTransform } from "@angular/core";

//Pipe decorator
@Pipe({
    name: 'summary' //keyword che si vuole usare in HTML
})
export class SummaryPipe implements PipeTransform {
    transform(value: string, limit?: number) {
        if(!value){
            return null;
        }
        let actualLimit = (limit) ? limit : 12;
        return value.substring(0, actualLimit) + "[Substring]";
    }
}