import { Observable } from 'rxjs';

export function PromiseToObservable<T>() {
  return function promiseToObservableDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const origin = target[propertyKey];
    descriptor.value = function(...args) {
      return new Observable<T>(ob => {
        (origin.apply(this, args) as Promise<T>)
          .then((data: T) => {
            ob.next(data);
            ob.complete();
          })
          .catch(err => {
            ob.error(err);
          });
      });
    };
  };
}
