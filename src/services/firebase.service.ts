import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  private firebaseReference: any;
  constructor() {
    this.firebaseReference = firebase;
  }

  getRef(): any {
    return this.firebaseReference;
  }

  auth(): any {
    return this.firebaseReference.auth();
  }

  getFacebookAuthProvider() {
    return new this.firebaseReference.auth.FacebookAuthProvider();
  }

  signInWithPopup(fbProvider): Promise<any> {
    return this.auth().signInWithPopup(fbProvider);
  }
}
