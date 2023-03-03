import { render, screen } from '@testing-library/react';
import { Todo } from './Todo';

const todo = {
  id: 1,
  name: "do something",
  archived: false,
  done: false,
}

test('renders content', () => {
  render(<Todo todo={todo}/>);
  const element = screen.getByText('do something');
  expect(element).toBeDefined();
});

test('shows done status', () => {
  render(<Todo todo={todo}/>);
  const element = screen.getByText('Done: false');
  expect(element).toBeDefined();
});

test('shows set done button', () => {
  render(<Todo todo={todo}/>);
  const element = screen.getByText('set done');
  expect(element).toBeDefined();
});
