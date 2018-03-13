
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { Home } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home;
  tab2Root = AboutPage;
  

  constructor() {

  }
}
