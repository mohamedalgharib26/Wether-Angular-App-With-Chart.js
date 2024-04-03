import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private _http: HttpClient) {}
  GetData(target: string) {
    return this._http.get(
      `https://api.weather.gov/gridpoints/${target}/31,80/forecast`
    );
  }
}
