import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseService } from './firebase.service';
import { setTimeout } from 'timers';

const USER_INIT = {
  displayName: 'No name'
};

@Injectable()
export class LoginService {
  private loggedIn = false;
  private _userDataChanges: BehaviorSubject<any> = new BehaviorSubject<any>(USER_INIT);

  get userData(): any {
    // Returns cloned row data. Should avoid mutation by object's recreance
    return {...this._userDataChanges.getValue()};
  }

  set userData(data) {
    this._userDataChanges.next(data);
  }

  get userDataChanges(): Observable<any> {
    // Returns Observable stream
    return this._userDataChanges;
  }

  constructor (
    private firebase: FirebaseService
  ) {}

  isAuthenticated (): boolean {
    return this.loggedIn;
  }

  login (): Promise<any> {
    const fbProvider = this.firebase
      .getFacebookAuthProvider()
      .setCustomParameters({'display': 'popup'});

    return new Promise((resolve, reject) => {
      return this.firebase.signInWithPopup(fbProvider)
        .then(response => response.user)
        .then(user => {
          this.loggedIn = true;
          this.userData = user;
          // Keep setTimeout in order to finish all tarted function invocations
          return setTimeout(() => resolve(this.userData), 0);
        })
        .catch(error => reject({error: error.message}));
      });
  }
}
