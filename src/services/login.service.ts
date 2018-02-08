import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class LoginService {
  user = {
    displayName: 'Not authorized',
    photoURL: 'https://csforallteachers.org/profiles/cs10k/themes/cs10k/images/source/userDefualt.png'
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
          this.user.photoURL = user.photoURL;
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
