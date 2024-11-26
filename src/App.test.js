import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Enter the link of the website you want scrubbed for information:");
  expect(linkElement).toBeInTheDocument();
});
