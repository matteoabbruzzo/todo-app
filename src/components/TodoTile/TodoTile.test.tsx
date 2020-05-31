import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoTile from './TodoTile';

const mockCreateTodoIdem = (_name: string, _description: string) => {
  return;
};
const mockUpdateTodoItem = (
  _idTodoItem: number,
  _name: string,
  _description: string
) => {
  return;
};
const mockDeleteTodoItem = (_idTodoItem: number) => {
  return;
};
test('display todo', () => {
  render(
    <TodoTile
      mode={0}
      updateTodoItem={mockUpdateTodoItem}
      createTodoIdem={mockCreateTodoIdem}
      deleteTodoItem={mockDeleteTodoItem}
      idTodo={1}
      initName="Test Name Todo"
      initDescription="Test Description Todo"
      flagReplay={false}
    />
  );

  expect(screen.getByLabelText('Name')).toHaveValue('Test Name Todo');
  expect(screen.getByLabelText('Description')).toHaveValue(
    'Test Description Todo'
  );

  expect;
});
