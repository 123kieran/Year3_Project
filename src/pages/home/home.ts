import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LogIn } from '../login/login';

 
//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {


  email : string = '';
  message : string = '';
  s;
  _chatSubscription;
  messages:string[];
  


  constructor(public db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams){
    this.email = this.navParams.get('email');
  this._chatSubscription = this.db.list('/home').subscribe(data =>{
    this.messages=data;
    });
}

signOut(){
  this.navCtrl.push(LogIn);

}

sendMessage() {
     this.db.list('/home').push({
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