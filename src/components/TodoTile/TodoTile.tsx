import React, { useState, useEffect } from 'react';
import { TileMode } from '../../utils/type';
import classes from './TodoTile.module.css';

type TodoTileProps = {
  mode: TileMode;
  idTodo: number;
  initName: string;
  initDescription: string;
  initCreationDate?: string;
  createTodoIdem: (name: string, description: string) => void;
  updateTodoItem: (
    idTodoItem: number,
    name: string,
    description: string
  ) => void;
  deleteTodoItem: (idTodoItem: number) => void;
  flagReplay: boolean;
};

const TodoTile = (props: TodoTileProps) => {
  const {
    mode,
    idTodo,
    initCreationDate,
    initName,
    initDescription,
    createTodoIdem,
    updateTodoItem,
    deleteTodoItem,
    flagReplay,
  } = props;

  const [name, setName] = useState<string>(initName);
  const [description, setDescription] = useState<string>(initDescription);

  useEffect(() => {
    if (initName && initDescription) {
      setName(initName);
      setDescription(initDescription);
    }
  }, [initName, initDescription]);

  const nameOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = event.target.value;
    setName(current);
  };

  const descriptionOnChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const current = event.target.value;
    setDescription(current);
  };

  const onSaveClickHandler = () => {
    if (name && description) {
      createTodoIdem(name, description);
      setName('');
      setDescription('');
    } else {
      alert('Check your input value');
    }
  };

  const onUpdateClickHandler = () => {
    if (idTodo && name && description) {
      updateTodoItem(idTodo, name, description);
      alert(`TO-DO ${name} updated`);
    } else {
      alert('Check your input value');
    }
  };

  const onDeleteClickHandler = () => {
    if (idTodo) {
      deleteTodoItem(idTodo);
    } else {
      alert('Check your input value');
    }
  };

  return (
    <div className={classes.Container}>
      {mode === TileMode.modify && initCreationDate ? (
        <label htmlFor={`date-${idTodo}`}>
          Creation date
          <input
            id={`date-${idTodo}`}
            type="text"
            value={initCreationDate}
            disabled
          />
        </label>
      ) : null}

      <label htmlFor={`name-${idTodo}`}>
        Name
        <input
          type="text"
          onChange={nameOnChangeHandler}
          value={name}
          id={`name-${idTodo}`}
        />
      </label>

      <label htmlFor={`description-${idTodo}`}>
        Description
        <textarea
          rows={4}
          cols={50}
          onChange={descriptionOnChangeHandler}
          value={description}
          id={`description-${idTodo}`}
        />
      </label>

      <div className={classes.ButtonPanel}>
        <div>
          {mode === TileMode.create ? (
            <button
              type="button"
              className={classes.SaveButton}
              onClick={onSaveClickHandler}
              disabled={flagReplay}
            >
              Create TO-DO
            </button>
          ) : null}

          {mode === TileMode.modify ? (
            <>
              <button
                type="button"
                className={classes.SaveButton}
                onClick={onUpdateClickHandler}
                disabled={flagReplay}
              >
                Update
              </button>
              <button
                type="button"
                className={classes.DeleteButton}
                onClick={onDeleteClickHandler}
                disabled={flagReplay}
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TodoTile;
