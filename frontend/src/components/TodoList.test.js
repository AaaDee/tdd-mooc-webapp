import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';

const todos = [
  {
    id: 1,
    name: "do something",
    archived: false,
    done: false,
  },
  {
    id: 2,
    name: "do something else",
    archived: false,
    done: false,
  },
]


test('shows elements', () => {
  render(<TodoList todos={todos}/>);
  const linkElement = screen.getByText('do something else');
  expect(linkElement).toBeInTheDocument();
});
