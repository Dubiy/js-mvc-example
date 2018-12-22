class ListView extends EventEmitter {
    constructor(model, rootElement) {
        super();
        this.model = model;
        this.listRef = document.createElement('ul');
        this.rebuildList();
        rootElement.appendChild(this.listRef);

        this.model.on('remove', item => {
            this.removeItem(item);
        });

        this.model.on('add', item => {
            let li = this.createItem(item);
            this.listRef.appendChild(li);
        });

        this.model.on('done', item => {
            this.checkItem(item);
        });
    }

    rebuildList() {
        while (this.listRef.childNodes.length) {
            this.listRef.childNodes[0].remove();
        }
        this.model.getItems().forEach(item => {
            let li = this.createItem(item);
            this.listRef.appendChild(li);
        })
    }

    createItem(item) {
        let li = document.createElement('li');
        li.task = item;
        if (item.done) {
            li.classList.add('done');
        }

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.done;
        checkbox.addEventListener('change', event => {
            this.emit('itemCheckboxChange', item);
        });
        li.appendChild(checkbox);

        let text = document.createElement('span');
        text.innerText = item.text;
        li.appendChild(text);

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'delete';
        deleteBtn.addEventListener('click', event => {
            this.emit('itemDeleteClick', item);
        });
        li.appendChild(deleteBtn);

        return li;
    }

    removeItem(item) {
        [].forEach.call(this.listRef.childNodes, element => {
            if (element.task === item) {
                this.listRef.removeChild(element);
            }
        })
    }

    checkItem(item) {
        [].forEach.call(this.listRef.childNodes, element => {
            if (element.task === item) {
                element.querySelector('input').checked = item.done;
            }
        })
    }
}