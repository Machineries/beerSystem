import { Component, OnInit } from '@angular/core';
import { SystembolagetService } from '../services/systembolaget.service';

interface DataValue {
    country: string;
    value: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent {
    data: any = null;
  constructor(private _service: SystembolagetService) {
      this._service.getSortiment().subscribe(sortiment => {
        const statisticsData = this.getStatisticData(sortiment);
        this.data = {
            labels: statisticsData.map(cd => cd.country),
            datasets: [
                {
                    data: statisticsData.map(cd => cd.value),
                    backgroundColor: statisticsData.map(a => this.getRandomHexColor())
                    ,
                    hoverBackgroundColor: statisticsData.map(a => this.getRandomHexColor())
                }]
            };
        });
  }

  getRandomHexColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  getStatisticData = (sortiment): DataValue[] => {
    const contries: any = {};
    sortiment.forEach(a => {
        if (contries[a.Ursprunglandnamn]) {
          contries[a.Ursprunglandnamn] += 1;
        } else {
          contries[a.Ursprunglandnamn] = 1;
        }
    });

    const data: DataValue[] = [];
    for (const country in contries) {
      if (contries.hasOwnProperty(country)) {
          const item = <DataValue> {country: country, value: +contries[country]};
          data.push(item);
      }
    }
    data.sort((a, b) => {
        if (a.value < b.value) return 1;
        else if (a.value > b.value) return -1;
        return 0;
    });
    return data;
  }


}
