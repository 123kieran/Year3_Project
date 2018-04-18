import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Home } from '../home/home';
/*
  Generated class for the RoomsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html'
})
export class RoomsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  openhome(){
    this.navCtrl.push(Home);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPagePage');
  }

}
