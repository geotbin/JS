import { Component } from '@angular/core';

declare var cordova: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  result = {};
 
  constructor() { }
 
  authWithSpotify() {
    const config = {
      clientId: "9fe491a7f9d14e429b8eac366690ec56",
      redirectUrl: "spotifygeot://callback",
      scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"],
      tokenExchangeUrl: "https://spotify-oauth-geot.herokuapp.com/exchange",
      tokenRefreshUrl: "https://spotify-oauth-geot.herokuapp.com/refresh",
    };
 
    cordova.plugins.spotifyAuth.authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        this.result = { access_token: accessToken, expires_in: expiresAt, ref: encryptedRefreshToken };
      });
  }

  logOutSpotify(){
    cordova.plugins.spotifyAuth.forget();
    this.result = {};
    
  } 


}
