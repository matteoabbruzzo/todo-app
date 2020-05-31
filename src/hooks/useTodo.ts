import { useState } from 'react';
import {
  Todo,
  todoDBName,
  todoStoreName,
  Recording,
  Action,
} from '../utils/type';
import { addItem, getAll } from '../utils/db';

const useTodo = (): [
  Todo[],
  (name: string, description: string) => Promise<void>,
  (id: number, name: string, description: string) => Promise<void>,
  (id: number) => Promise<void>,
  () => void,
  boolean,
  () => void,
  boolean
] => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [flagRecording, setFlagRecording] = useState<boolean>(false);
  const [flagReplay, setFlagReplay] = useState<boolean>(false);

  const tooggleFlagRecording = () => {
    setFlagRecording((flag) => !flag);
  };

  const createTodoIdem = async (name: string, description: string) => {
    const date = Date.now();

    const newItem: Todo = {
      Id: date,
      Name: name,
      Description: description,
      CreationDate: new Date(date).toLocaleString(),
    };
    if (flagRecording) {
      await addItem<Recording>(todoDBName, todoStoreName, {
        todoItem: newItem,
        action: Action.Create,
      });
    }
    setTodoList((list) => [...list, newItem]);
  };

  const getTodoItemPosition = (idTodoItem: number): number => {
    return todoList.findIndex((todo: Todo) => {
      return todo.Id === idTodoItem;
    });
  };

  const updateTodoItem = async (
    idTodoItem: number,
    name: string,
    description: string
  ) => {
    const position: number = getTodoItemPosition(idTodoItem);
    if (position !== -1) {
      const copyTodoList = [...todoList];
      const item: Todo = { ...copyTodoList[position] };
      item.Name = name;
      item.Description = description;
      if (flagRecording) {
        await addItem<Recording>(todoDBName, todoStoreName, {
          todoItem: item,
          action: Action.Update,
        });
      }
      setTodoList(copyTodoList);
    }
  };

  const deleteTodoItem = async (idTodoItem: number) => {
    const position: number = getTodoItemPosition(idTodoItem);
    if (position !== -1) {
      if (flagRecording) {
        await addItem<Recording>(todoDBName, todoStoreName, {
          todoItem: todoList[position],
          action: Action.Remove,
        });
      }
      setTodoList((list) =>
        list.filter((localTodo: Todo) => {
          return localTodo.Id !== idTodoItem;
        })
      );
    }
  };

  const playAllRecording = async () => {
    setTodoList([]);
    setFlagReplay(true);
    const items: Recording[] = await getAll(todoDBName, todoStoreName);
    const updateUIIteration: Promise<Todo[]>[] = [];

    items.forEach((item: Recording, i: number) => {
      const promiseUI = new Promise<Todo[]>((resolve) => {
        setTimeout(() => {
          switch (item.action) {
            case Action.Create:
              setTodoList((list) => [...list, item.todoItem]);
              break;
            case Action.Remove:
              setTodoList((list) =>
                list.filter((localTodo: Todo) => {
                  return localTodo.Id !== item.todoItem.Id;
                })
              );
              break;
            case Action.Update:
              setTodoList((list) =>
                list.map((localTodo: Todo) => {
                  if (localTodo.Id === item.todoItem.Id) {
                    return item.todoItem;
                  }
                  return localTodo;
                })
              );
              break;
            default:
              console.error('Action not supported');
          }
          resolve();
        }, 1000 * (i + 1));
      });
      updateUIIteration.push(promiseUI);
    });

    await Promise.all(updateUIIteration);
    setFlagReplay(false);
  };

  return [
    todoList,
    createTodoIdem,
    updateTodoItem,
    deleteTodoItem,
    playAllRecording,
    flagRecording,
    tooggleFlagRecording,
    flagReplay,
  ];
};

export default useTodo;
