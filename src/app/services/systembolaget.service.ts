import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

export interface IArtikel {
  Alkoholhalt: string;
  Argang: string;
  Artikelid: string;
  Ekologisk: string;
  Etiskt: string;
  Forpackning: string;
  Forslutning: string;
  Koscher: string;
  Leverantor: string;
  Namn: string;
  Namn2: string;
  PrisPerLiter: string;
  Prisinklmoms: string;
  Producent: string;
  Provadargang: string;
  Saljstart: string;
  Sortiment: string;
  SortimentText: string;
  Stil: string;
  Typ: string;
  Ursprung: string;
  Ursprunglandnamn: string;
  Utgått: string;
  Varnummer: string;
  Varugrupp: string;
  Volymiml: string;
  nr: string;
}

@Injectable()
export class SystembolagetService {

  constructor(private http: Http) { }

  getSortiment = () => {
    return this.http.get('http://localhost:3000/sortiment')
        .map(response => response.json().artiklar.artikel.filter(a => a.Varugrupp === 'Öl') as IArtikel[]);
  }

  getProducent= () => {
    return this.http.get('http://localhost:3000/beerwiki')
        .map(response => response.json().artiklar.artikel.filter(a => a.Varugrupp === 'Öl') as IArtikel[]);
  }

  getImg = () => {
    return this.http.get('http://localhost:3000/image');
  }

}
