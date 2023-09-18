export interface placesResponse {
    name:string,
    place_id:string,
    adm_area1:string,
    country:string,
    lat:string,
    lon:string,
    timezone:string
}

export interface forecastResponse {
    lat:string,
    lon:string,
    daily:cityDataObj
}

export interface cityDataObj {
    data:weatherData[]
}

export interface weatherData {
    day:string,
    weather:string,
    icon:number,
    summary:string,
}
