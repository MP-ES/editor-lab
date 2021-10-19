import { render, screen } from '@testing-library/react';
import App from './App';

test('renders menu', () => {
  render(<App />);
  const boldElement = screen.getByText(/B/i);
  expect(boldElement).toBeInTheDocument();
});
