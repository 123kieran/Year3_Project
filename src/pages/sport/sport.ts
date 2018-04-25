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
  time:any;
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

  var now = new Date();
  var hrs = now.getHours();
  var mins = now.getMinutes();

 if(hrs<12){
      if(mins<10 || mins == 0){
        this.time = hrs+":"+"0"+mins+" "+"AM";          
      }
      else{
        this.time = hrs+":"+mins+" "+"AM";     
      }
  }

  if(hrs == 12){
      if(mins<10 || mins == 0){
        this.time = hrs+":"+"0"+mins+" "+"PM";          
      }
      else{
        this.time = hrs+":"+mins+" "+"PM";     
      }
  }

  if(hrs>12){
      hrs=hrs-12;
      if(mins<10 || mins == 0){
           this.time = hrs+":"+"0"+mins+" "+"PM";          
      }
      else{
           this.time = hrs+":"+mins+" "+"PM";     
      }







     this.db.list('/sport').push({
      email: this.email,
       message: this.message,
       time: this.time
     }).then( () =>{
      //message  is sent
     }).catch( () =>{
      //error
    });
    this.message='';
  
   }

  }

}