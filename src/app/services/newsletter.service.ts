import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub: PushSubscription) {
        return this.http.post('/api/notifications', sub);
    }

    send() {
        return this.http.post('/api/newsletter', null);
    }

}
