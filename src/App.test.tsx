import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('Check renders menu', () => {
  render(<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);
  const linkElement = screen.getByText(/About us/i);
  expect(linkElement).toBeInTheDocument();
});
