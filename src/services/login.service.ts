import { Injectable, NgZone } from '@angular/core';
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
    // Clone of row User's data with spread operator.
    return {...this._userDataChanges.getValue()};
  }

  set userData(data) {
    this._userDataChanges.next(data);
  }

  get userDataChanges(): Observable<any> {
    return this._userDataChanges; // Observable stream
  }

  constructor (
    private firebase: FirebaseService,
    private zone: NgZone
  ) {}

  isAuthenticated (): boolean {
    return this.loggedIn;
  }

  login (): Promise<any> {
    // TODO: Emit loading event
    const fbProvider = this.firebase
      .getFacebookAuthProvider()
      .setCustomParameters({'display': 'popup'});

    const onSuccess = response => {
      const {user} = response;
      this.loggedIn = true;
      this.userData = user;
      // TODO: Emit loading event
    };

    const onError = error => ({error: error.message});

    return this.resolvePromiseWithAngularZone(
      () => this.firebase.signInWithPopup(fbProvider),
      onSuccess,
      onError
    );
  }

  resolvePromiseWithAngularZone(promiseFunc, onSuccessFn, onErrorFn = value => value): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.zone.runOutsideAngular(() => {
        return promiseFunc().then(result =>
            this.zone.run(() => resolve(onSuccessFn(result)))
          )
          .catch(error => reject(onErrorFn(error)));
        }
      );
    });
  }
}
