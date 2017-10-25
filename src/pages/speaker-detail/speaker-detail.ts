import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  segment: 'speaker/:speakerId'
})
@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;


  constructor(public dataProvider: ConferenceData,
              public navCtrl: NavController,
              public navParams: NavParams) {

  this.speaker = this.navParams.get('speaker');


  }


  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', {
      sessionId: session.id });
  }
}
