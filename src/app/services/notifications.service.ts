import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(private http: HttpClient) { }

  public isSubscribedOnServer() {
    const subscriptions = this.http.get(`${environment.apiUrl}/notification/push/subscribers`);
    // TODO: Finish implementation
  }
}
