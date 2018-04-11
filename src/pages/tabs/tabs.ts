
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { Home } from '../home/home';
import { LogIn } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home;
  tab2Root = AboutPage;
  

  constructor() {

  }
}
