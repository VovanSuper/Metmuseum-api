import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App component', () => {
  it('renders App component', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByDisplayValue('Loading ...')).toBeTruthy());
  });

  it('renders learn react link', () => {
    const { container } = render(<App />);
    const wrapperEl = container.querySelector('.App-content') as HTMLDivElement;
    expect(wrapperEl).not.toBeNull();
  });
});
