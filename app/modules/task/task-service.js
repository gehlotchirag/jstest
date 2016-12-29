(function(taskManager, $) {
  taskManager.tasks = {

    getTask: function() {
      if (localStorage.getItem('note')){
        taskManager.notes = JSON.parse(localStorage.getItem('note'));
        this.renderTask(taskManager.notes);
      }
      else{
        alert("start creating tasks");
      }
    },

    addTask: function() {
      var taskTitle = document.getElementById("taskForm").elements.namedItem("title").value;
      var taskDecsription = document.getElementById("taskForm").elements.namedItem("description").value;
      var priority = document.getElementById("taskForm").elements.namedItem("priority").value;
      var id = Math.floor((Math.random() * 10000) + 1);
      var done = false;
      var createdOn = Date.now();
      var newNote = {id:id, title: taskTitle, description: taskDecsription, createdOn: createdOn, done:done,priority:priority};
      taskManager.notes.push(newNote);
      localStorage.setItem('note' , JSON.stringify(taskManager.notes));
      alert("Note Added");
      this.getTask();
    },

    doneTask: function(id) {
    if(confirm("Sure with to complete task?")) {
      taskManager.notes = $.grep(taskManager.notes, function(e) {if (e.id===id) e.done = true; return e;});
      localStorage.setItem('note' , JSON.stringify(taskManager.notes));
      alert("task completed");
      this.getTask();
    }
    },

    deleteTask: function(id) {
      taskManager.notes = $.grep(taskManager.notes, function(e) {return e.id!=id});
      localStorage.setItem('note' , JSON.stringify(taskManager.notes));
      alert("Note Removed");
      this.getTask();
    },

    renderTask: function(notes) {
      var template='';
      $.each(notes, function(i, note) {
        var createdOn = new Date(note.createdOn);
        var bgclass = 'panel-default';
        if (note.done)
        bgclass = 'panel-success';
        template = template+'<div class="col-md-4"><div class="panel '+bgclass+'"><div class="panel-body"><div class="close"><button type="button" class="btn btn-success" onclick="taskManager.tasks.doneTask('+note.id+')"><span class="glyphicon glyphicon glyphicon-ok" aria-hidden="true"></span></button><button type="button" class="btn btn-default" onclick="taskManager.tasks.deleteTask('+note.id+')"><span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span></button></div><h3>'+note.title+'</h3><b>status:</b>'+note.priority+'</br><small>'+note.description+'<br>'+createdOn+'</small></div></div></div>';
      });
      $('#mynotes').html(template);
    },

    init: function() {
      this.getTask();
    }
  }
  taskManager.tasks.init();
})(this.taskManager = this.taskManager || {}, $);
