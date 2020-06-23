import { Observable } from 'rxjs/Observable';

const onSubscribe = observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.error('Someting Wrong');
  observer.complete();
};

const source$ = new Observable(onSubscribe);

const theObserver = {
  next: item => console.log(item),
  complete: () => console.log('No More Data'),
  error: err => console.log(err)
};

source$.subscribe(theObserver);
