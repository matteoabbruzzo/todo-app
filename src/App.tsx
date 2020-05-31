import React from 'react';
import TodoTile from './components/TodoTile/TodoTile';
import { TileMode, Todo, todoDBName, todoStoreName } from './utils/type';
import useTodo from './hooks/useTodo';
import { clearAllItems } from './utils/db';
import classes from './App.module.css';

const App = () => {
  const [
    todoList,
    createTodoIdem,
    updateTodoItem,
    deleteTodoItem,
    playAllRecording,
    flagRecorging,
    toggleFlagRecording,
    flagReplay,
  ] = useTodo();

  const onPlayClickHandler = async () => {
    playAllRecording();
  };

  const todoStack = todoList.map((todo: Todo) => {
    return (
      <TodoTile
        key={todo.Id}
        idTodo={todo.Id}
        mode={TileMode.modify}
        initCreationDate={todo.CreationDate}
        initName={todo.Name}
        initDescription={todo.Description}
        createTodoIdem={createTodoIdem}
        updateTodoItem={updateTodoItem}
        deleteTodoItem={deleteTodoItem}
        flagReplay={flagReplay}
      />
    );
  });

  return (
    <div>
      <div className={classes.AppBar}>TO-DO Web App</div>
      <div className={classes.RecordingBar}>
        {flagReplay ? (
          <div className={classes.AlertReplay}>Replay in progress</div>
        ) : null}
        <div>
          <button
            className={
              flagRecorging ? classes.StopButton : classes.RecordingButton
            }
            type="button"
            onClick={toggleFlagRecording}
            disabled={flagReplay}
          >
            {flagRecorging ? 'Stop recording' : 'Start recording'}
          </button>
          <button
            type="button"
            onClick={onPlayClickHandler}
            disabled={flagRecorging}
            className={classes.PlayButton}
          >
            Replay
          </button>
          <button
            type="button"
            onClick={() => {
              clearAllItems(todoDBName, todoStoreName);
              alert('Store is empty');
            }}
            disabled={flagRecorging || flagReplay}
            className={classes.EmptyButton}
          >
            Empty stored recording
          </button>
        </div>
      </div>
      <div className={classes.Title}>Create new TO-DO</div>
      <TodoTile
        idTodo={0} // first tile for creation
        initName=""
        initDescription=""
        mode={TileMode.create}
        flagReplay={flagReplay}
        createTodoIdem={createTodoIdem}
        updateTodoItem={updateTodoItem}
        deleteTodoItem={deleteTodoItem}
      />
      {todoList.length > 0 ? (
        <div className={classes.Title}>Your TO-DO list</div>
      ) : null}
      {todoStack}
    </div>
  );
};

export default App;
