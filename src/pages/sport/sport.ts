import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LogIn } from '../login/login';

 
//@IonicPage()
@Component({
  selector: 'page-sport',
  templateUrl: 'sport.html',
})
export class SportPage {
  email : any;
  message : string = '';
  s;
  _chatSubscription;
  messages:string[];
  
  constructor(public db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams){
    this.email = this.navParams.get('email');
  this._chatSubscription = this.db.list('/sport').subscribe(data =>{
    this.messages=data;
    });
}

signOut(){
  this.navCtrl.push(LogIn);

}

sendMessage() {
     this.db.list('/sport').push({
      email: this.email,
       message: this.message
     }).then( () =>{
      //message  is sent
     }).catch( () =>{
      //error
    });
    this.message='';
  
   }

  }