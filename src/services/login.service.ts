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

  getAuthProvider (type: string) {
    switch (type) {
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider();
      case 'github':
        return new firebase.auth.GithubAuthProvider();
      default:
        return new firebase.auth.FacebookAuthProvider();
    }
  }

  login (type: string) {
    return new Promise(resolve =>
      this.afAuth.auth.signInWithPopup(this.getAuthProvider(type))
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
