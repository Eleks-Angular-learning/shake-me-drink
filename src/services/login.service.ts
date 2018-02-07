import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class LoginService {
  loggedIn = false;
  user = {
    displayName: 'Not authorized'
  };

  constructor (public afAuth: AngularFireAuth) {}

  isAuthenticated () {
    return this.loggedIn;
  }

  login () {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(data => {
        const {user} = data;
        this.user.displayName = user.displayName;
      });
  }
}
