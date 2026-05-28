import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Exercise2 from './page';

describe('Exercise2 Page', () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
    global.fetch = jest.fn() as any;
  });

  afterEach(() => {
    cleanup();
  });

  test('renders loading state and then loads fixed range slider', async () => {
    const mockResponse = { rangeValues: [1.99, 10.99, 50.00] };
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as any)
    );

    render(<Exercise2 />);

    expect(screen.getByText('Loading fixed values...')).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByText('Loading fixed values...')).toBeNull();
    });

    expect(screen.getByText('Fixed Range')).toBeTruthy();
    expect(screen.getByText('1.99€')).toBeTruthy();
    expect(screen.getByText('50.00€')).toBeTruthy();
  });
});
