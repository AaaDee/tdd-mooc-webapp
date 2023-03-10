import { render, screen } from '@testing-library/react';
import { ArchiveButton } from './ArchiveButton'

test('renders button', () => {
  render(<ArchiveButton />);
  const linkElement = screen.getByText('Archive completed');
  expect(linkElement).toBeInTheDocument();
});
