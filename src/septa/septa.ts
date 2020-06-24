import rp from "request-promise";
import { Observable } from "rxjs";

export const getS$ = new Observable(observer => {
  rp("https://www3.septa.org/hackathon/TrainView/")
    .then(res => {
      return JSON.parse(res);
    })
    .then(body => {
      observer.next(body);
      observer.complete();
    })
    .catch(err => {
      observer.error(err);
    });
});
