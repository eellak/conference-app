import { Component } from '@angular/core';

import {AlertController, MenuController, NavController, Slides} from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs-page/tabs-page';
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;


  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public network: Network,
    public alertCtrl : AlertController
  ) {



    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      //console.log('network was disconnected :-(');
      let alert = this.alertCtrl.create({
        title: 'No Internet Connection',
        subTitle: 'Please turn it on and try again.',
        buttons: ['OK']
      });
      alert.present();

    });

    disconnectSubscription.unsubscribe();

    // stop disconnect watch


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 1000);

    });
    connectSubscription.unsubscribe();

  }

  startApp() {

    this.navCtrl.push(TabsPage);
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  // ionViewWillEnter() {
  //   this.slides.update();
  // }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
