import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class LoginService {
  constructor (public afAuth: AngularFireAuth) {}

  isAuthenticated () {
    return sessionStorage.getItem('loginData');
  }

  getUserData () {
    return this.afAuth.auth.currentUser || JSON.parse(sessionStorage.getItem('loginData'));
  }

  login () {
    return new Promise(resolve =>
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(data => {
          const {user} = data;
          sessionStorage.setItem('loginData', JSON.stringify(user));
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
