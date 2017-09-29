import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";

@IonicPage({
  segment: 'session/:sessionId'
})
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;

  sessionParam: any;
  sessionKey: any;
  speaker: any;
  SessionObj : FirebaseObjectObservable<any>;
  constructor(
    public navParams: NavParams,
    public data : AngularFireDatabase
  ) {
    if(this.navParams.get('session')){
      this.sessionParam = this.navParams.get('session');
    }else{
      this.sessionKey = this.navParams.get('sessionPath');
      this.speaker = this.navParams.get('speaker');
      this.SessionObj = <FirebaseObjectObservable<any>> this.data.object(`${this.sessionKey}`).take(1);
      this.SessionObj.subscribe(x =>{
        console.log(x);
      });
      console.log(this.sessionParam);

    }
    console.log(this.sessionKey);

  }

  ionViewWillEnter() {

    /*
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    }); */

  }
}
