import { Component, OnInit } from '@angular/core';
import { SystembolagetService } from '../services/systembolaget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news = ['öl', 'alkoholfri öl', 'flat tire'];
  beerInput = '';

  artiklar: any[] = null;
  beerTypes = [{label: 'Alla', value: ''}];
  countries = [{label: 'Alla', value: ''}];
  yearFilter: number;
  yearTimeout: any;
  constructor(private systembolagetService: SystembolagetService) {
    this.systembolagetService.getSortiment().subscribe(res => {
      console.warn(res.artiklar.artikel);
      this.artiklar = res.artiklar.artikel.filter(a => a.Varugrupp === 'Öl').map(a => {
        a.Namn += ' ' + a.Namn2;
        return a;
      });
      const types = this.artiklar.map(a => a.Typ);
      const unique = Array.from(new Set(types));
      this.beerTypes = this.beerTypes.concat(unique.map(s => {
        return {label: s, value: s};
      }));
      const countries = this.artiklar.map(a => a.Ursprunglandnamn);
      const countriesUnique = Array.from(new Set(countries)).sort((a, b) => {
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      this.countries = this.countries.concat(countriesUnique.map(s => {
        return {label: s, value: s};
      }));
    });
  }

  onYearChange(event, dt, col) {
    if(this.yearTimeout) {
        clearTimeout(this.yearTimeout);
    }
    this.yearTimeout = setTimeout(() => {
        dt.filter(event.value, col.field, col.filterMatchMode);
    }, 250);
  }

  sortAlk(event) {
    const sortAlkComparer = (a, b) => {
      const alk_a = parseInt(a.Alkoholhalt, 10);
      const alk_b = parseInt(b.Alkoholhalt, 10);
      if (alk_a < alk_b)
        return -1 * event.order;
      if (alk_a > alk_b)
        return 1 * event.order;
      return 0;
    };
    this.artiklar = [...this.artiklar.sort(sortAlkComparer)];
  }

  compareAscending(a, b) {
    if (a.Ursprunglandnamn < b.Ursprunglandnamn)
      return -1;
    if (a.Ursprunglandnamn > b.Ursprunglandnamn)
      return 1;
    return 0;
  }

  compareDescending(a, b) {
    if (a.Ursprunglandnamn > b.Ursprunglandnamn)
      return -1;
    if (a.Ursprunglandnamn < b.Ursprunglandnamn)
      return 1;
    return 0;
  }

  sortBy = (sorting: string, ascending: boolean) => {
    switch (sorting) {
      case 'land':
        if (ascending)
          this.artiklar.sort(this.compareAscending);
        else
          this.artiklar.sort(this.compareDescending);

        break;
      default:
        return;
    }
  }

  ngOnInit() {}

  onClickBeer() {
    this.systembolagetService.getSortiment();
    this.news.push(this.beerInput);
    this.beerInput = '';
  }
  onClickRemove = () => {
    this.news = [];
  }

}