import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from 'src/app/services/data.service';
import { Observable, Observer, of } from 'rxjs';
import { forecastResponse, placesResponse } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent {
  res: any; 
  constructor(private dataService:DataService){}
  searchValue:string = "";
  querySearchParam:string = "";
  resultData:any;
  items!: any[];
  forecastItems!:any;

  
   search(){
    if (this.searchValue == "") return;
    this.dataService.findPlaces(this.searchValue).subscribe({

      next: (response: placesResponse) => {
        this.resultData = response;
      },
      error:(error:any) => {
        console.log(error);
        window.alert("error: "+ JSON.stringify(error.error.detail));
      }

    })
   }

  getCityData(item:any){
    this.dataService.getForecast(item.place_id).subscribe({
      next: (response: forecastResponse) => {
        console.log(response);
        this.forecastItems = (response.daily.data || []).map(item => {
        return  item =  {
            day: this.returnFixedDateString( item.day) ,
            weather:item.weather ,
            icon: parseInt( JSON.stringify(item.icon)) ,
            summary:item.summary,
          }

        } ); 
      },
      error:(error:any) => {
        console.log(error);
        window.alert("error: "+ JSON.stringify(error.error.detail));
      }

    })
  }

  replaceSpace(){
         this.searchValue = this.searchValue.trim();
         if (this.searchValue.includes(' ')){
          this.querySearchParam = this.searchValue.replace(/\s/g, '+');
         } 
  }

  clearSearch() {
    this.searchValue = ""
    this.resultData = null;
    this.items= [];
    this.forecastItems=[];
  }

  returnFixedDateString(date:string):string {
    var newDate = new Date(date);
    return newDate.toDateString();
  }

  clearSearchData() {
    this.resultData = undefined;
    this.items = [];
  }
  
  ngOnDestroy() {
    this.res.unsubscribe();
  }
}


