class EventEmitter {
    constructor() {
        this.events = [];
    }

    on(event, handler) {
        this.events.push({
            event,
            handler
        })
    }

    emit(event, data) {
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].event === event) {
                this.events[i].handler(data);
            }
        }
    }

}