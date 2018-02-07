import {Injectable, NgZone} from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {
  loggedIn = false;
  user = {
    displayName: 'Row display name'
  };
  _userDataChanges$: BehaviorSubject<any> = new BehaviorSubject<any>({displayName: 'Not authorized!'});

  get userDataChanges$ () {
    return this._userDataChanges$.asObservable();
  }

  getUser () {
    return this.user;
  }

  constructor (private zone: NgZone) {}
  isAuthenticated () {
    return this.loggedIn;
  }

  login () {
    const provider = new firebase.auth.FacebookAuthProvider();

    provider.setCustomParameters({'display': 'popup'});

    return firebase.auth().signInWithPopup(provider)
      .then(response => {
        this.zone.run(() => {
          const {user} = response;

          console.error('response user', user);

          this.loggedIn = true;
          this.user = user;
          this._userDataChanges$.next(user);
        });
      })
      .catch(error => console.error(`Error: ${error.message}`));
  }
}
