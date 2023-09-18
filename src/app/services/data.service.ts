import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';



const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Accept-Charset','UTF-8')
  .set( 'Access-Control-Allow-Origin', '*')

@Injectable()
export class DataService {
    private _apiUrl = environment._apiUrl;
    private _appKey = environment._appKey;
    constructor(private http: HttpClient) { }

    findPlaces(text:string) :Observable<any>{
        return this.http.get<any>(`${this._apiUrl}find_places?text=${text}&key=${this._appKey}`);
    }

    getForecast(place_id:string) :Observable<any>{
        return this.http.get<any>(`${this._apiUrl}point?place_id=${place_id}&sections=all&timezone=UTC&language=en&units=metric&key=${this._appKey}`);
    }
    
    
}