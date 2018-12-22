class TaskController extends EventEmitter {
    constructor(rootElement) {
        super();
        this.root = rootElement;

        this.model = new TaskModel([
            {
                text: 'brew coffee',
                done: true
            },
            {
                text: 'write app',
                done: false
            }
        ]);

        this.listView = new ListView(this.model, this.root);

        this.formView = new FormView(this.model, this.root);

        this.listView.on('itemCheckboxChange', item => {
            this.model.done(item, !item.done);
        });
        this.listView.on('itemDeleteClick', item => {
            this.model.remove(item);
        });


        this.formView.on('formSubmit', (data) => {
            this.model.add(data.value);
        })


    }
}