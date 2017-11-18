import { Component, OnInit } from '@angular/core';
import { SystembolagetService, ISystembolagerResult } from '../../services/systembolaget.service';
import { EEmitterStatus } from '../../services/emitter';
    
    
interface DataValue {
    beersorts: string;
    value: number;
}
    
@Component({
    selector: 'app-beersort',
    templateUrl: './beersort.component.html',
    styleUrls: ['./beersort.component.css']
})
    
export class BeersortComponent {
    data: any = null;
    constructor(private _service: SystembolagetService) {
        const result = this._service.getSortiment();
        console.warn(result);
        this._service.onChange(this.onChangeSoritment);
        this.setStatisticsData(result);
    }
    
    private setStatisticsData = (result: ISystembolagerResult) => {
        if (result.status === EEmitterStatus.Loaded) {
            const sortiment = result.data.artiklar.map(a => a.Typ);
            console.warn(sortiment);
            const statisticsData = this.getStatisticData(sortiment);
            console.warn(statisticsData);
            this.data = {
                labels: statisticsData.map(cd => cd.beersorts),
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
        const beersort: any = {};
        sortiment.forEach(a => {
            if (beersort[a]) {
                beersort[a] += 1;
            } else {
                beersort[a] = 1;
            }
        });
    
        const data: DataValue[] = [];
        for (const beersorts in beersort) {
          if (beersort.hasOwnProperty(beersorts)) {
              const item = <DataValue> {beersorts: beersorts, value: +beersort[beersorts]};
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
    