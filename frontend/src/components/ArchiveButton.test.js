import { render, screen } from '@testing-library/react';
import { ArchiveButton } from './ArchiveButton'
import userEvent from '@testing-library/user-event'

test('renders button', () => {
  render(<ArchiveButton />);
  const button = screen.getByText('Archive completed');
  expect(button).toBeInTheDocument();
});

test('handler gets called', async () => {
  const handler = jest.fn()
  render(<ArchiveButton handler={handler}/>);
  const button = screen.getByText('Archive completed');
  expect(button).toBeInTheDocument();
  const user = userEvent.setup()
  await user.click(button)

  expect(handler.mock.calls).toHaveLength(1)
});

