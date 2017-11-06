import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { AlertController, App, List, NavController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage implements OnInit , OnDestroy{
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  //

  shownSessionsDay_1: any = false;
  shownSessionsDay_2: any = false;
  groups: any = [];

  scheduleDataFirst : FirebaseListObservable<any[]>;
  scheduleDataSec : FirebaseListObservable<any[]>;

  scheduleSubFirst : Subscription;
  scheduleSubSec: Subscription;

  segment = 'day_one';
  day_two = 'day_two';
  loader :any;

  uuid : string ;


  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public user: UserData,
    private uniqueDeviceID: UniqueDeviceID,

    public database : AngularFireDatabase,
    public data : AngularFireDatabase,
    private network: Network) {

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

      this.ngOnInit();
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection!');
        }
      }, 3000);

    });
    connectSubscription.unsubscribe();


  }

  ionViewWillLoad() {
    this.app.setTitle('Πρόγραμμα');
    this.getDeviceID();
    //this.updateSchedule();
  }

  // }).map(values =>{
  //   return values.map(value =>{
  //     this.keyHelper = value.$key;
  //     value.sessions.forEach(ses =>{
  //       console.log(ses);
  //       console.log(ses.$key);
  //       // this.database.database.ref('users-day-1/'+ this.uuid + '/' + this.keyHelper + '/sessions/').child(ses.id).update({
  //       //     liked : 'false',
  //       //     sanitized : 'false'
  //       // });
  //
  //
  //     });
  //     // this.database.database.ref('users-day-1/'+ this.uuid + '/' + values.$key + '/sessions/').child(value.$key).push({
  //     //   liked : false
  //     // });
  //     return value;
  //   })

  async ngOnInit(){

    try {
      // stop connect watch
      //Loader
      this.loader = this.loadingCtrl.create({
        content: "Παρακαλώ περιμένετε...",
        duration: 2500
      });
      this.loader.present();

      this.scheduleDataFirst = <FirebaseListObservable<any[]>> this.database.list(`/schedule-day-1/0/groups`, {
        query: {
          orderByKey: true
        }
      });

      this.scheduleSubFirst = this.scheduleDataFirst.subscribe(data => {
        if (data) {
          this.shownSessionsDay_1 = true;
        }
        return data;
      });


      this.scheduleDataSec = this.database.list(`/schedule-day-2/0/groups`, {
        query: {
          orderByKey: true
        }
      });
      this.scheduleSubSec = this.scheduleDataSec.subscribe(data => {
        if (data) {
          this.shownSessionsDay_2 = true;
        }
        return data;
      });
    }catch(e){
      console.log(e);
    }

    this.loader.dismiss();

    this.getDeviceID();


  }

  // updateSchedule() {
  //   // Close any open sliding items when the schedule updates
  //   this.scheduleList && this.scheduleList.closeSlidingItems();
  //
  //   this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
  //     //this.shownSessions = data.shownSessions;
  //     this.groups = data.groups;
  //   });
  // }
  // presentFilter() {
  //   let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
  //   modal.present();
  //
  //   modal.onWillDismiss((data: any[]) => {
  //     if (data) {
  //       this.excludeTracks = data;
  //       this.updateSchedule();
  //     }
  //   });
  //
  // }

  ngOnDestroy(){
    this.scheduleSubFirst.unsubscribe();
    this.scheduleSubSec.unsubscribe();
  }


  getDeviceID(){
    if(!this.uuid) {
      try {
        this.uniqueDeviceID.get()
          .then((uuid: any) => {
            console.log(uuid)
            this.uuid = uuid;
          })
      } catch (e) {
        console.log(e);
      }
    }

    return this.uuid;
  }


//index = sessionKey
  goToSessionDetail(sessionData: any,index : any, groupKey : any,day: string) {
    // go to the session detail page
    // and pass in the session data


    this.navCtrl.push(SessionDetailPage, {
       // sessionId: sessionData.id,
       // name: sessionData.name
      session: sessionData,
      index: index,
      groupKey: groupKey,
      deviceId: this.uuid,
      day: day,


    });
  }

}
