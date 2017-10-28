import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SystembolagetService {

  constructor(private http: Http) { }

  getSortiment = () => {
    return this.http.get('http://localhost:3000/sortiment')
        .map(response => response.json());
  }

  getImg = () => {
    return this.http.get('http://localhost:3000/image');
  }

}
