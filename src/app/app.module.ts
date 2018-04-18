import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Home } from '../pages/home/home';
import { LogIn } from '../pages/login/login';
import { CreateUser } from '../pages/create-user/create-user';
import { AboutPage } from '../pages/about/about';
import { RoomsPage } from '../pages/rooms/rooms';
// Firebase / AngularFire2 Stuff
// Adapted from https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
// Use this to store config object, pass it into AngularFireModule.initialiseApp etc 
// Info taken from my firebase account
export const firebaseConfig = {
  apiKey: "AIzaSyCy4fdfkAyf2h_GZr1LlhB25z5P0Ggo5hs",
    authDomain: "chatproject-24165.firebaseapp.com",
    databaseURL: "https://chatproject-24165.firebaseio.com",
    projectId: "chatproject-24165",
    storageBucket: "chatproject-24165.appspot.com",
    messagingSenderId: "332709716876"
};


@NgModule({
  declarations: [   
    MyApp,
    Home,
    LogIn,
    CreateUser,
    AboutPage,
    RoomsPage,

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig) //initialise firebase
  ],
  bootstrap: [IonicApp],
  entryComponents: [    // entryComponents tells the offline template compiler to compile the components and create factories for them
    MyApp,
    Home,
    LogIn,
    CreateUser,
    AboutPage,
    RoomsPage,
 
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler} ]
})
export class AppModule {}
