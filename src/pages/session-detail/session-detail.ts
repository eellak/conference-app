import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController} from 'ionic-angular';

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
  day: string;

  helper: string;
  constructor(
    public navParams: NavParams,
    public data : AngularFireDatabase,
    public database : AngularFireDatabase,
    private uniqueDeviceID: UniqueDeviceID,
    private toastCtrl : ToastController) {

    if(this.navParams.get('session')){
      this.sessionParam = this.navParams.get('session');
      this.index = this.navParams.get('index');
      this.groupKey = this.navParams.get('groupKey');
      this.deviceId = this.navParams.get('deviceId');
      this.day = this.navParams.get('day');
      this.helper = this.day;
      if(this.day == 'users-day-1'){
        console.log(this.helper);
        try {
          this.SessionObj = <FirebaseObjectObservable<any>> this.data.object(`/schedule-day-1/0/groups/${this.groupKey}/sessions/${this.index}`).take(1);
          this.SessionObj.subscribe();

          this.LikeObj = <FirebaseObjectObservable<any>> this.database.object(`/${this.day}/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
          this.LikeObj.subscribe();
        }catch(e){
          console.log(e);
        }
      }else{
        try{
          this.SessionObj = <FirebaseObjectObservable<any>> this.data.object(`/schedule-day-2/0/groups/${this.groupKey}/sessions/${this.index}`).take(1);
          this.SessionObj.subscribe();

          this.LikeObj = <FirebaseObjectObservable<any>> this.database.object(`/${this.day}/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
          this.LikeObj.subscribe();
        }catch(e){
          console.log(e);
        }

      }


    }else{
      this.sessionKey = this.navParams.get('sessionPath');
      this.speaker = this.navParams.get('speaker');
      this.deviceId = this.navParams.get('deviceId');
      this.index = this.navParams.get('index');
      this.groupKey = this.navParams.get('groupKey');
      this.day = this.navParams.get('day');
      this.getDeviceID();

      if(this.day == 'schedule-day-1'){
        this.helper = 'users-day-1';
        try{
          this.SessionObj = <FirebaseObjectObservable<any>> this.data.object(`${this.sessionKey}`).take(1);
          this.SessionObj.subscribe();

          this.LikeObj = <FirebaseObjectObservable<any>> this.database.object(`/users-day-1/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
          this.LikeObj.subscribe();
          console.log(this.LikeObj);
        }catch(e){
          console.log(e);
        }
      }else{
        this.helper = 'users-day-2';

        try{
          this.SessionObj = <FirebaseObjectObservable<any>> this.data.object(`${this.sessionKey}`).take(1);
          this.SessionObj.subscribe();

          this.LikeObj = <FirebaseObjectObservable<any>> this.database.object(`/users-day-2/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
          this.LikeObj.subscribe();
        console.log(this.LikeObj);
        }catch(e){
          console.log(e);
        }
      }


    }

  }

  async LikeSession(date: string){
    this.getDeviceID();
    try{

      if(this.deviceId) {
        this.data.database.ref(date + '/' + this.deviceId + '/' + this.groupKey + '/sessions/').child(this.index).update({
          liked: 'true',
          sanitized: 'false'
        }).catch(e => {
          console.log(e);
        });
      }else{

        this.toastCtrl.create({
          message : `Your Unique Device ID Is Not Specified , Try Again`,
          duration : 2000
        }).present();

      }

    }catch(e){
      console.log(e);
    }



    if(date == 'users-day-1'){
      try{
        this.LikeObj = await <FirebaseObjectObservable<any>> this.data.object(`/users-day-1/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
        this.LikeObj.subscribe();
        this.SessionObj = <FirebaseObjectObservable<any>> this.database.object(`/schedule-day-1/0/groups/${this.groupKey}/sessions/${this.index}`);
        this.SessionObj.subscribe();
      }catch(e){
        console.log(e);
      }
    }else{
      try{
        this.LikeObj = await <FirebaseObjectObservable<any>> this.data.object(`/users-day-2/${this.deviceId}/${this.groupKey}/sessions/${this.index}`).take(1);
        this.LikeObj.subscribe();
        this.SessionObj = <FirebaseObjectObservable<any>> this.database.object(`/schedule-day-2/0/groups/${this.groupKey}/sessions/${this.index}`);
        this.SessionObj.subscribe();
      }catch(e){
        console.log(e);
      }

    }


  }

  getDeviceID(): string{
    if(!this.deviceId) {
      try {
        this.uniqueDeviceID.get()
          .then((uuid: any) => {
            console.log(uuid)
            this.deviceId = uuid;
          })
      } catch (e) {
        console.log(e);
      }
    }
    return this.deviceId;

  }



}
