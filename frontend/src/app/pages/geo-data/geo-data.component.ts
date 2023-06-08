import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import proj4 from 'proj4';
import { HttpClient } from '@angular/common/http';

const huettenIcon = L.icon({
  iconUrl: 'assets/yellowHouse.png',
  iconSize: [20, 20],
  iconAnchor: [24, 24]
});

const knotenIcon = L.icon({
  iconUrl: 'assets/blueknot.png',
  iconSize: [20, 20],
  iconAnchor: [24, 24]
});

const rettungIcon = L.icon({
  iconUrl: 'assets/redCross.jpg',
  iconSize: [20, 20],
  iconAnchor: [24, 24]
});

const iconRetinaUrl = 'assets/marker-icon-2x.png';
var iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;


proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');


@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit{
  // @ts-ignore
  private map: L.Map;
  layers: L.Layer[] = [];

  constructor(private http: HttpClient) { }



  ngOnInit() {
    // Erstelle die Karte
    this.map = L.map('map').setView([50.7753, 6.0839], 13);

    // Füge eine Kachelkarte hinzu (z.B. OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.map);
  }


  transformGeoJSONCoordinates(data: any): any {
    // Clone the original data to avoid modifying it directly
    const transformedData = JSON.parse(JSON.stringify(data));

    // Iterate through each feature and transform its coordinates
    transformedData.features.forEach((feature: any) => {
      // Transform each coordinate pair using Proj4
      feature.geometry.coordinates = proj4('EPSG:25832', 'EPSG:4326', feature.geometry.coordinates);
      console.log(feature)
    });

    return transformedData;
  }

  huettenAnzeige(){
    this.http.get('assets/schutzhuetten.json').subscribe((data: any) => {
      const transformedData = this.transformGeoJSONCoordinates(data);


      L.geoJSON(transformedData, {
        pointToLayer: (feature, latlng)=>{
          let icon: L.Icon;

          icon = huettenIcon;

          return L.marker(latlng, {icon})
        }

      }
    ).addTo(this.map);
    });
  }

  rettungAnzeige(){
    this.http.get('assets/rettungspunkte.geojson').subscribe((data: any) => {
      const transformedData = this.transformGeoJSONCoordinates(data);
      L.geoJSON(transformedData, {
          pointToLayer: (feature, latlng)=>{
            let icon: L.Icon;

            icon = rettungIcon;

            return L.marker(latlng, {icon})
          }

        }
      ).addTo(this.map);


    });
  }

  knotenAnzeige(){
    this.http.get('assets/knotenpunkte.json').subscribe((data: any) => {
      const transformedData = this.transformGeoJSONCoordinates(data);
      L.geoJSON(transformedData, {
          pointToLayer: (feature, latlng)=>{
            let icon: L.Icon;

            icon = knotenIcon;

            return L.marker(latlng, {icon})
          }

        }
      ).addTo(this.map);
    });
  }

  deleteAllMarkers(){

  }

  }
