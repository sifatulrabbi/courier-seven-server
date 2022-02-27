"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventClass = void 0;
class EventClass {
    constructor() {
        this.subscribers = [];
    }
    subscribe(event, callback) {
        this.subscribers.push({
            event,
            callback,
        });
    }
    unsubscribe(event, callback) {
        const index = this.subscribers.indexOf({ event, callback });
        if (index < 0)
            return;
        this.subscribers.splice(index, 1);
    }
    trigger(event, data) {
        const arr = this.subscribers.filter((item) => item.event === event);
        for (const item of arr) {
            item.callback(data);
        }
    }
}
exports.EventClass = EventClass;
