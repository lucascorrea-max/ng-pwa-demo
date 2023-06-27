import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOnline: boolean = false;
  modalVersion: boolean = false;

  constructor(private swUpdate: SwUpdate) {

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
  }

  public updateVersion() {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion() {
    this.modalVersion = false;
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }
}
