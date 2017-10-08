import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

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
  LikeObj : FirebaseObjectObservable<any>;

  index: any;
  groupKey: any;
  deviceId: any;
  constructor(
    public navParams: NavParams,
    public data : AngularFireDatabase,
    public viewCtrl: ViewController,

  ) {
    if(this.navParams.get('session')){
      this.sessionParam = this.navParams.get('session');
      this.index = this.navParams.get('index');
      this.groupKey = this.navParams.get('groupKey');
      this.deviceId = this.navParams.get('deviceId');
      this.LikeObj = <FirebaseObjectObservable<any>> this.data.object(`/users-day-1/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
      this.LikeObj.subscribe();

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

  LoveSession(){
    //this.deviceId = 'someid' //this.getDeviceID();
    this.data.database.ref('users-day-1/'+ this.deviceId + '/' + this.groupKey + '/sessions/').child(this.index).update({
      liked : 'true',
      sanitized: 'false'
    }).catch(e =>{
      console.log(e);
    });
    this.LikeObj = <FirebaseObjectObservable<any>> this.data.object(`/users-day-1/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
    this.LikeObj.subscribe();

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
