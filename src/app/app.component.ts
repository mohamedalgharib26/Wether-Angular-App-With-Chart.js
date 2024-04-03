import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Wether App';
  chart: any = [];
  city: string = 'LWX';
  Data: any;
  labels: any;

  constructor(private _Service: WeatherService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.chart.update();
  }
  ngOnInit(): void {
    this.getValues();
  }
  getValues() {
    this._Service.GetData(this.city).subscribe((data: any) => {
      this.Data = data.properties.periods;
      this.labels = this.Data.map((item: any) => item.name);
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Temperature (Fahrenheit)',
              data: this.Data.map((item: any) => item.temperature),
            },
            {
              label: 'Relative Humidity (%)',
              data: this.Data.map((item: any) => item.relativeHumidity.value),
            },
            {
              label: 'Probability Of Precipitation (%)',
              data: this.Data.map(
                (item: any) => item.probabilityOfPrecipitation.value
              ),
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }
  onChange(value: string) {
    this.chart.destroy();
    this.city = value;
    this.getValues();
  }
}
