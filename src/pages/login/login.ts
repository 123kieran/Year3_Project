import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';
//import { Home } from '../home/home';
import { CreateUser } from '../create-user/create-user';
import firebase from 'firebase'; // for password reset
import { TabsPage } from '../tabs/tabs';
import { Home } from '../home/home';
import { RoomsPage } from '../rooms/rooms';
import { AboutPage } from '../about/about';
// AngularFireAuth allows log in / sign up features

// Log In functions adapted from 
// https://devdactic.com/ionic-2-firebase/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LogIn {


  loader: any;
  public user = {email: '', password: ''};
  public userAuth: boolean = this.navParams.get('userAuth'); 
  public fireauth = firebase.auth();
  public loggedIn = true;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public auth: AngularFireAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController, ) {
    platform.registerBackButtonAction(() => {
        this.platform.exitApp();
    });
  }

// Register a user
  openRegisterPage(){
    this.navCtrl.push(CreateUser);
  }

// User Log In
  public login() {
    let email = this.user.email; // example@email.com, original email address
    this.showLoading();
    //this.navCtrl.push(Home, {email});
    // Attempt to log the user in and push to home page
    this.auth.login(this.user, {
      provider: AuthProviders.Password,
        method: AuthMethods.Password
    }).then((authData) => {
      this.loader.dismiss();
      this.navCtrl.push(RoomsPage, {email});  //push the email to home page
       this.navCtrl.setRoot(RoomsPage);
    
    
    }).catch((error) => {
      this.showError(error); // if log in is unsuccessful show error
    });

  } // end log in

// Forgot password
  forgotPassword(){

    let prompt = this.alertCtrl.create({
      title: 'Forgotten Password',
      message: "Send Reset Link to:",
      inputs: [
        {
          name: 'email',
          placeholder: 'your@email.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log(data.email);

            let email = data.email;
            
            // Set up toast if successful
              let toast = this.toastCtrl.create({
                message: 'Reset link sent! Check your emails.',
                duration: 5000  // lasts 3 seconds
              });

            // Set up an alert in case of error
            console.log("Email: " + email);
            let prompt = this.alertCtrl.create({
                title: 'Whoops!',
                subTitle: "Something went wrong... Make sure you entered the right email!",
                buttons: ['OK']
              });

            this.fireauth.sendPasswordResetEmail(email).then(function() {

              toast.present();

            }, function(error) {
              console.log("Something went wrong");

              prompt.present();

            }); 
          } // end handler
        } // end save functions
      ] // end buttons
    }); // end create alert
    
    prompt.present(); // show reset prompt

  }

// let user know it's loading...
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }

// Show user an error
   showError(text) {
    setTimeout(() => {
      this.loader.dismiss();
    });
 
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
    
  }

}