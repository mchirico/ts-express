import { Component, OnInit } from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {NotificationFirestoreService} from '../../service/firebase/notification-firestore.service';

@Component({
  selector: 'app-fb-notification',
  templateUrl: './fb-notification.component.html',
  styleUrls: ['./fb-notification.component.css']
})
export class FbNotificationComponent implements OnInit {
  sub: PushSubscription;
  readonly VAPID_PUBLIC_KEY = 'BM0lKvFxWsyi6sjmH5PWdJqE6qTNcH6Uh4jWR6yr2NTYYpnTUuxDaoPAnAJjN3lDC1mCzlCuCHbMhKerA1gBr-A';
  minutes = 20;
  desc = 'desc';

  constructor( private swPush: SwPush,
               private newsletterService: NotificationFirestoreService) { }

  subscribeToNotifications(): void {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {

        this.sub = sub;
        const data = {desc: this.desc, minutes: this.minutes,
        action: 'activate'};

        console.log('Notification Subscription: ', sub);

        this.newsletterService.addPushSubscriber(sub, data).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err =>  console.log('Could not send subscription object to server, reason: ', err)
        );

      })
      .catch(err => console.error('Could not subscribe to notifications', err));

  }

  sendNewsletter(): void {
    console.log('Sending Newsletter to all Subscribers ...');
    this.newsletterService.send().subscribe();
  }

  ngOnInit(): void {
  }

}
