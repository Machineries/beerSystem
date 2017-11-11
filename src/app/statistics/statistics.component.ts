import { Component, OnInit } from '@angular/core';
import { SystembolagetService, ISystembolagerResult } from '../services/systembolaget.service';
import { EEmitterStatus } from '../services/emitter';

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
      const result = this._service.getSortiment();
      console.warn(result);
      this._service.onChange(this.onChangeSoritment);
      this.setStatisticsData(result);
    }

    private setStatisticsData = (result: ISystembolagerResult) => {
        if (result.status === EEmitterStatus.Loaded) {
            const sortiment = result.data.artiklar.map(a => a.Ursprunglandnamn);
            console.warn(sortiment);
            const statisticsData = this.getStatisticData(sortiment);
            console.warn(statisticsData);
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
        }
    }

    private onChangeSoritment = () => {
        const result = this._service.getSortiment();
        console.warn(result);
        this.setStatisticsData(result);
    }

    getRandomHexColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

  getStatisticData = (sortiment): DataValue[] => {
    const contries: any = {};
    sortiment.forEach(a => {
        if (contries[a]) {
          contries[a] += 1;
        } else {
          contries[a] = 1;
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
