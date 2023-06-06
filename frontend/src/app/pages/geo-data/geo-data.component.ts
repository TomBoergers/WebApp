import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';



@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements AfterViewInit{
  // @ts-ignore
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [  50.7753, 6.0839 ],
      zoom: 13
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  }



  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }


}
