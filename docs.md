Task
  Start
    user-token (ids the user)
    task title: Working on the application for client X
    start-time: NOW()
    Interval: number of minutes to wait before automatically finishing the task



    Return
    TaskID

  STATE
    Once a task has been started, we want to set the state as started
    Once a task had finished - Status.Finished
    Once a task has stopped - Distraction - We want to set that state

    - set a timer for X minutes on the server side to mark the task as complete