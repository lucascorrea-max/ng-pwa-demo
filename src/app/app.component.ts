import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
import { NewsletterService } from './services/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnline: boolean = false;
  modalVersion: boolean = false;
  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;
  notificationGrant: boolean = false;
  readonly VAPID_PUBLIC_KEY = "BMLSJsPJDm_FNfEaFlIUlJCnt_XLvqd5WeSg-NYfHY998DMdBHEGBaLxhCUiSNck-_osSgNLv9nMcLB-b87DR-g";

  constructor(
    private newsletterService: NewsletterService,
    private platform: Platform,
    private swPush: SwPush,
    private swUpdate: SwUpdate) {

  }

  ngOnInit(): void {
    this.updateOnlineStatus();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((event: any): event is VersionReadyEvent => event.type === 'VERSION_READY'),
        map((event: any) => {
          console.info(`Current version: ${event.currentVersion} | Latest version: ${event.latestVersion}`);
          this.modalVersion = true;
        })
      );
    }

    this.loadModalPwa();
  }

  public subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  public updateVersion() {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion() {
    this.modalVersion = false;
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any> window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }
}
