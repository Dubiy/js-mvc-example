class TaskModel extends EventEmitter{
    constructor(items = []) {
        super();

        this.loadItems();

        if (this.items.length === 0) {
            this.items = items;
        }
    }

    loadItems() {
        let data = localStorage.getItem("task-list-items");
        this.items = JSON.parse(data) || [];
    }

    saveItems() {
        localStorage.setItem("task-list-items", JSON.stringify(this.items));
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
        this.saveItems();
    }

    remove(...items) {
        items.forEach(item => {
            if (this.items.includes(item)) {
                this.items.splice(this.items.indexOf(item), 1);
                this.emit('remove', item);
            }
        });
        this.saveItems();
    }

    done(item, done = true) {
        item.done = done;
        this.emit('done', item);
        this.saveItems();
    }
}