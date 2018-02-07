// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDKN4Mv4ze4vJqpsrvtPyc9wQWconf-6wI',
    authDomain: 'shake-me-drink.firebaseapp.com',
    databaseURL: 'https://shake-me-drink.firebaseio.com',
    projectId: 'shake-me-drink',
    storageBucket: 'shake-me-drink.appspot.com',
    messagingSenderId: '868189501067'
  }
};
