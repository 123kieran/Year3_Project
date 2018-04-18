
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { Home } from '../home/home';
import { LogIn } from '../login/login';
import { NavController,  NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  email : string = '';
  tab1Root = Home;
  tab2Root = AboutPage;
  
 
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.email = this.navParams.get('email') 
}


emailpush(){
  let email = this.email;
  this.navCtrl.push(Home, {email});
}
}