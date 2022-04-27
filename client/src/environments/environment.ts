// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: "AIzaSyCCViHQCJKKv0vc3W3J7P8lwWguOiMy7Es",
  authDomain: "bulletin-board-d1815.firebaseapp.com",
  databaseURL: "https://bulletin-board-d1815.firebaseio.com",
  projectId: "bulletin-board-d1815",
  storageBucket: "bulletin-board-d1815.appspot.com",
  messagingSenderId: "47301007248",
  appId: "1:47301007248:web:56ae1a946e6ada7f78c515",
  measurementId: "G-88LRBQZ38Y"
};

export const environment = {
  useEmulators: true,
  production: false,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
