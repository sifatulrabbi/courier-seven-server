import type { ISubscriber, ICallback } from '../interfaces';

export class EventClass<E, D> {
  subscribers: ISubscriber<E, D>[] = [];

  subscribe(event: E, callback: ICallback<D>) {
    this.subscribers.push({
      event,
      callback,
    });
  }

  unsubscribe(event: E, callback: ICallback<D>) {
    const index = this.subscribers.indexOf({ event, callback });
    if (index < 0) return;
    this.subscribers.splice(index, 1);
  }

  trigger(event: E, data: D) {
    const arr = this.subscribers.filter((item) => item.event === event);
    for (const item of arr) {
      item.callback(data);
    }
  }
}
