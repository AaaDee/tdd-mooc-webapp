import { render, screen } from '@testing-library/react';
import { Title } from './Title';

test('renders title', () => {
  render(<Title />);
  const linkElement = screen.getByText('TODO APP');
  expect(linkElement).toBeInTheDocument();
});
