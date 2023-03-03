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
  const nameElement = screen.getByText('do something');
  expect(nameElement).toBeDefined();
});
