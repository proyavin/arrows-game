import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
