import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class LoginService {
  user = {
    displayName: 'Not authorized'
  };

  constructor (public afAuth: AngularFireAuth) {}

  isAuthenticated () {
    return sessionStorage.getItem('loginData');
  }

  getUserData () {
    return this.afAuth.auth.currentUser;
  }

  login () {
    return new Promise(resolve =>
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(data => {
          const {user} = data;
          this.user.displayName = user.displayName;
          sessionStorage.setItem('loginData', user.uid);
          return resolve(user);
        })
    );
  }

  logout () {
    return this.afAuth.auth.signOut().then(() => {
      sessionStorage.removeItem('loginData');
    });
  }
}
