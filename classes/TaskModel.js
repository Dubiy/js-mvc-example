class TaskModel extends EventEmitter{
    constructor(items = []) {
        super();
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    add(...items) {
        items.forEach(text => {
            let item = {
                text,
                done: false
            };
            this.items.push(item);
            this.emit('add', item);
        });

    }

    remove(...items) {
        items.forEach(item => {
            if (this.items.includes(item)) {
                this.items.splice(this.items.indexOf(item), 1);
                this.emit('remove', item);
            }
        });
    }

    done(item, done = true) {
        item.done = done;
        this.emit('done', item);
    }
}