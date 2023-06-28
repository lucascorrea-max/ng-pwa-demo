import { Component, OnInit } from '@angular/core';
import { SwRegistrationOptions } from '@angular/service-worker';
import { NotificationsService } from './services/notifications.service';

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
    private notificationsService: NotificationsService,
    private sw: SwRegistrationOptions
  ) {
    this.notificationGranted = window.Notification.permission === 'granted';
  }

  ngOnInit(): void {
    this.isOnline = this.sw.enabled;
  }

  public async subscribeToNotifications() {
    (await this.notificationsService.subscribeToNotifications()).subscribe({
      next: () => {
        this.pushSubscribed = true;
        this.notificationGranted = window.Notification.permission === 'granted';
      }
    });
  }
}
