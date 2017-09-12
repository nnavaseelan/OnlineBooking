import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
          
             return _.filter(array, row=> new Date(row.StartTime).getDate()== new Date(query).getDate()
             && new Date(row.StartTime).getMonth() == new Date(query).getMonth()
             && new Date(row.StartTime).getFullYear()== new Date(query).getFullYear()
             );
             
  
        }
        return array;
    }
}