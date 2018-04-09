import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


 
//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {
  newemail : string='' ;
  message : string = '';
  s;
  _chatSubscription;
  messages:string[];


  constructor(public db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams){
    this.newemail = this.navParams.get('newemail');
  this._chatSubscription = this.db.list('/home').subscribe(data =>{
    this.messages=data;
    });
}

sendMessage() {
     this.db.list('/home').push({
      newemail: this.newemail,
       message: this.message
     }).then( () =>{
      //message  is sent
     }).catch( () =>{
      //error
    });
    this.message='';
   }

   ionViewDidLoad(){
     this.db.list('/home').push({
     specialMessage: true,
     message: `${this.newemail} has joined the room`
   });
}

  ionViewWillLeave() {
    this._chatSubscription.unsubscribe();
    this.db.list('/home').push({
      specialMessage: true,
      message: `${this.newemail} has left the room`
    });
    }
}