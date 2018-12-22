function taskController(rootElement) {

    let tasks = new TaskModel([
        {
            text: 'Brew coffee',
            done: true
        },
        {
            text: 'Write some code',
            done: false
        },
        {
            text: 'Sleep',
            done: false
        }
    ]);


    taskView(rootElement, tasks, {
        onDone,
        onDelete
    });

    taskAddFromView(rootElement, {
        onSubmit
    });

    function onDone(task, status) {
        tasks.done(task, status);
        console.log('tasks', tasks);
    }

    function onDelete(task) {
        tasks.delete(task);
    }

    function onSubmit(text) {
        tasks.add(text);
    }


}