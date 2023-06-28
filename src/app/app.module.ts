import { HttpClientModule } from "@angular/common/http";
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstallPromptModalComponent } from './components/install-prompt-modal/install-prompt-modal.component';
import { WsversionModalComponent } from './components/wsversion-modal/wsversion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WsversionModalComponent,
    InstallPromptModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
