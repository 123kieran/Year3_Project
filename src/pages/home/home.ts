import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


 
//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {
  public user = {email: ''};
  message : string = '';
  s;
  _chatSubscription;
  messages:string[];


  constructor(public db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams){
    this.user.email = this.navParams.get('email');
  this._chatSubscription = this.db.list('/home').subscribe(data =>{
    this.messages=data;
    });
}

sendMessage() {
     this.db.list('/home').push({
      user: this.user.email,
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
     message: `${this.user.email} has joined the room`
   });
}

  ionViewWillLeave() {
    this._chatSubscription.unsubscribe();
    this.db.list('/home').push({
      specialMessage: true,
      message: `${this.user.email} has left the room`
    });
    }
}