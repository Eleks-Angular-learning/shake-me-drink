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

  login (email: string, password: string) {

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
          console.error('response', response);
          sessionStorage.setItem('loginData', JSON.stringify(response));
          return resolve(response);
        })
        .catch(({code, message}) => reject(`Error: ${code} ${message}`));
    });
  }

  createAccount (email: string, password: string) {
    console.error('createAccount service', email, password);

    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .catch(({code, message}) => reject(`Error: ${code} ${message}`));
    });
  }

  socialLogin (type: string) {
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
