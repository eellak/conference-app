import {Component} from '@angular/core';

import {
  ActionSheet,
  Config, LoadingController,
  NavController
} from 'ionic-angular';


import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import "rxjs/add/operator/mergeMap"
import "rxjs"


export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage{
  actionSheet: ActionSheet;
  speakers: any[] = [];

  speakers$Ref: FirebaseListObservable<any[]>;
  sessspeakers$Ref: FirebaseListObservable<any[]>;

  loader : any;
  speakersListVal:any;

  uuid: string;
  constructor(
    public navCtrl: NavController,
    public config: Config,
    public loadingCtrl : LoadingController,
    public database : AngularFireDatabase,
  ) {


    this.loader = this.loadingCtrl.create({
      content: "Παρακαλώ περιμένετε...",
      duration: 3000
    });
    this.loader.present();

    try {
      this.speakers$Ref = <FirebaseListObservable<any[]>> this.database.list(`/speakers/`, {
        query: {
          orderByKey: true
        }
      });

      this.speakers$Ref.subscribe(data => {
        if (data) {
          this.speakersListVal = true;
        }
        return data;
      });
      this.loader.dismiss();
    }catch(e){
      console.log(e);
    }

  }



  goToSessionDetail(session: any, speakerName: any) {
    console.log(session);
    var day = session.sessionKey.substring( 0, session.sessionKey.indexOf("/"));
    console.log(day);
    this.navCtrl.push(SessionDetailPage, {
      sessionPath: session.sessionKey,
      speaker : speakerName,
      deviceId: this.uuid,
      index: session.index,
      groupKey: session.groupKey,
      day:day,
    });
  }

  goToSpeakerDetail(speaker: any) {
    this.navCtrl.push(SpeakerDetailPage, {
      speaker: speaker
    });
  }

}
