import { Component } from '@angular/core';
// import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform } from 'ionic-angular';


// declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  // @ViewChild('mapCanvas') mapElement: ElementRef;

  title: string = 'Λεωφ. Ελ. Βενιζέλου 70, Καλλιθέα';
  lat: number = 37.961377;
  lng: number = 23.708069;


  constructor( public platform: Platform) {
  }

  ionViewDidLoad() {

    // try {
    //   this.confData.getMap().subscribe((mapData: any) => {
    //     let mapEle = this.mapElement.nativeElement;
    //
    //     let map = new google.maps.Map(mapEle, {
    //       center: mapData.find((d: any) => d.center),
    //       zoom: 16
    //     });
    //
    //     mapData.forEach((markerData: any) => {
    //       let infoWindow = new google.maps.InfoWindow({
    //         content: `<h5>${markerData.name}</h5>`
    //       });
    //
    //       let marker = new google.maps.Marker({
    //         position: markerData,
    //         map: map,
    //         title: markerData.name
    //       });
    //
    //       marker.addListener('click', () => {
    //         infoWindow.open(map, marker);
    //       });
    //     });
    //
    //     google.maps.event.addListenerOnce(map, 'idle', () => {
    //       mapEle.classList.add('show-map');
    //     });
    //
    //   })
    // }catch(e){
    //   console.log(e);
    // }

  }
}
