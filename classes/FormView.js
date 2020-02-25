class FormView extends EventEmitter {
    constructor(model, root) {
        super();

        this.model = model;
        this.root = root;
        this.createForm(this.root);
    }

    createForm(root) {
        let form = document.createElement('form');
        form.innerHTML = `
            <input type="text" name="text">
            <input type="submit" value="add">
        `;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let value = form.text.value.trim();
            if (value) {
                this.emit('formSubmit', {
                    value
                });
                form.text.value = '';
            }
        });
        root.appendChild(form);
    }
}