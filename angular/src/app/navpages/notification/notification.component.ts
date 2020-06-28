import { Component, OnInit } from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {NotificationPostService} from '../../service/notification-post.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  sub: PushSubscription;
  readonly VAPID_PUBLIC_KEY = 'BM0lKvFxWsyi6sjmH5PWdJqE6qTNcH6Uh4jWR6yr2NTYYpnTUuxDaoPAnAJjN3lDC1mCzlCuCHbMhKerA1gBr-A';
  constructor( private swPush: SwPush,
               private newsletterService: NotificationPostService) { }

  subscribeToNotifications(): void {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {

        this.sub = sub;


        console.log('Notification Subscription: ', sub);

        this.newsletterService.addPushSubscriber(sub).subscribe(
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
