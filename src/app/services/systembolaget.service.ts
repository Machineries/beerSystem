import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import { Emitter, EEmitterStatus } from './emitter';
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

interface ISystembolagetData {
  artiklar: any[];
  countries: any[];
  beerTypes: any[];
}

export interface ISystembolagerResult {
  data: ISystembolagetData;
  status: EEmitterStatus;
}

@Injectable()
export class SystembolagetService extends Emitter {
  data: ISystembolagetData = null;

  constructor(private http: Http) {
    super();
  }

  getSortiment = (): ISystembolagerResult => {
    if (this.getStatus() === EEmitterStatus.NotLoaded) {
      this.setStatus(EEmitterStatus.Loading);
      this.http.get('http://localhost:3000/sortiment')
        .map(response => response.json())
        .subscribe(res => {
          const artiklar = res.artiklar.artikel.filter(a => a.Varugrupp === 'Öl').map(a => {
            a.Namn += ' ' + a.Namn2;
            return a;
          });
          const types = artiklar.map(a => a.Typ);
          const unique = Array.from(new Set(types));
          const beerTypes = unique.map(s => {
            return {label: s, value: s};
          });
          const countriesFromArtiklar = artiklar.map(a => a.Ursprunglandnamn);
          const countriesUnique = Array.from(new Set(countriesFromArtiklar)).sort((a, b) => {
            if (a < b)
              return -1;
            if (a > b)
              return 1;
            return 0;
          });
          const countries = countriesUnique.map(s => {
            return {label: s, value: s};
          });
          this.setStatus(EEmitterStatus.Loaded);
          this.data = {
            artiklar: artiklar,
            countries: countries,
            beerTypes: beerTypes
          };
          this.emit();
        });
    }
    return { status: this.getStatus(), data: this.data };
  }

  getImg = () => {
    return this.http.get('http://localhost:3000/image');
  }

}
