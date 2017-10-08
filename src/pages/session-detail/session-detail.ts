import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';

import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {UniqueDeviceID} from "@ionic-native/unique-device-id";

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
    public database : AngularFireDatabase,
    private uniqueDeviceID: UniqueDeviceID
  ) {
    if(this.navParams.get('session')){
      this.sessionParam = this.navParams.get('session');
      this.index = this.navParams.get('index');
      this.groupKey = this.navParams.get('groupKey');
      this.deviceId = this.navParams.get('deviceId');
      this.SessionObj = <FirebaseObjectObservable<any>> this.data.object(`/schedule-day-1/0/groups/${this.groupKey}/sessions/${this.index}`).take(1);
      this.SessionObj.subscribe();

      this.LikeObj = <FirebaseObjectObservable<any>> this.database.object(`/users-day-1/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
      this.LikeObj.subscribe();

    }else{
      this.sessionKey = this.navParams.get('sessionPath');
      this.speaker = this.navParams.get('speaker');
      this.deviceId = this.navParams.get('deviceId');
      this.index = this.navParams.get('index');
      this.groupKey = this.navParams.get('groupKey');


      this.SessionObj = <FirebaseObjectObservable<any>> this.data.object(`${this.sessionKey}`).take(1);
      this.SessionObj.subscribe();

      this.LikeObj = <FirebaseObjectObservable<any>> this.database.object(`/users-day-1/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
      this.LikeObj.subscribe();
      console.log(this.LikeObj);

    }

  }

  LoveSession(){
    this.getDeviceID();
    this.data.database.ref('users-day-1/'+ this.deviceId + '/' + this.groupKey + '/sessions/').child(this.index).update({
      liked : 'true',
      sanitized: 'true'
    }).catch(e =>{
      console.log(e);
    });
    this.LikeObj = <FirebaseObjectObservable<any>> this.data.object(`/users-day-1/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
    this.LikeObj.subscribe();
    this.SessionObj = <FirebaseObjectObservable<any>> this.database.object(`/schedule-day-1/0/groups/${this.groupKey}/sessions/${this.index}`).take(1);
    this.SessionObj.subscribe();

  }

  getDeviceID(): string{
    try {
      this.uniqueDeviceID.get()
        .then((uuid: any) => {
          console.log(uuid)
          this.deviceId = uuid;
        })
    }catch(e) {
      console.log(e);
    }
    return this.deviceId;

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
