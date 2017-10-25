import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  title: string = 'Λεωφ. Ελ. Βενιζέλου 70, Καλλιθέα';
  lat: number = 37.961377;
  lng: number = 23.708069;


  constructor( public platform: Platform) {
  }


}
