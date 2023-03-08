import { render, screen } from '@testing-library/react';
import { AddNote } from './AddNote';
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react';

test('renders text', () => {
  render(<AddNote />);
  const element = screen.getByText('Add note');
  expect(element).toBeInTheDocument();
});

test('Button can be clicked', async () => {
  const handler = jest.fn()
  render(<AddNote handleSubmit={handler}/>);

  const user = userEvent.setup()
  const button = screen.getByText('Add note')
  await user.click(button)

  expect(handler.mock.calls).toHaveLength(1)
});

test('Text is submitted', async () => {
  const handler = jest.fn()

  render(<AddNote handleSubmit={handler}/>);
  
  const user = userEvent.setup()
  const input = screen.getByRole('textbox')
  const button = screen.getByText('Add note')

  await act(async () => {
    await user.type(input, 'testing')
    await user.click(button)
  });  
  
  expect(handler.mock.calls[0][0]).toBe('testing')
});



