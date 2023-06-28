import { Component, OnInit } from '@angular/core';
import { SwPush, SwRegistrationOptions } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnline?: boolean;
  notificationGranted: boolean = false;
  pushSubscribed: boolean = false;

  constructor(
    private sw: SwRegistrationOptions,
    private swPush: SwPush) {
    this.notificationGranted = window.Notification.permission === 'granted';
  }

  ngOnInit(): void {
    this.isOnline = this.sw.enabled;
  }

  public subscribeToNotifications() {
    window.Notification.requestPermission().then(permission => {
      this.notificationGranted = permission === 'granted';
    });
    // this.swPush.requestSubscription({
    //   serverPublicKey: this.VAPID_PUBLIC_KEY
    // })
    //   .then((sub: PushSubscription) => this)
    //   .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
