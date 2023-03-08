import { render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import userEvent from '@testing-library/user-event'

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

test('set done button returns true', async () => {
  const handler = jest.fn()

  render(<Todo todo={todo} handler={handler}/>);

  const user = userEvent.setup()
  const button = screen.getByText('set done')
  await user.click(button)

  expect(handler.mock.calls[0][0]).toBe({id: 1, done: true})
});
