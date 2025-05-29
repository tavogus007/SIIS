// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '',
  useHash: false,
  //URL_API_LOGIN: 'http://192.168.0.104:3000/autenticacion/login',
  //URL_API_LOGIN: 'http://192.168.8.4:84/api/v1/servicio/login',
  //URL_API_SOCKET: 'http://192.168.0.104:5000/',
  //URL_API_LOGIN: 'http://192.168.8.4:84/api/v1/servicio/login',
  URL_API_LOGIN: 'http://localhost:3000/autenticacion/login',
  URL_API_LOGIN_ME: 'http://172.18.2.144:3000/autenticacion/login', 
  URL_API_SOCKET: 'http://localhost:5000/',
  mapbox: {
    accessToken: 'pk.eyJ1IjoidGF2b2d1czAwNyIsImEiOiJjbTkwOTgyaWkwazZlMm1uNGJudDJhemZ5In0.IgBUsceJyZmuwiieWktx3A'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
