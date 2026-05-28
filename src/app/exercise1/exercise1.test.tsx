import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Exercise1 from './page';

describe('Exercise1 Page', () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
    global.fetch = jest.fn() as any;
  });

  afterEach(() => {
    cleanup();
  });

  test('renders loading state initially and then loads Range component', async () => {
    const mockResponse = { min: 10, max: 200 };
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as any)
    );

    render(<Exercise1 />);

    expect(screen.getByText('Loading range data...')).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByText('Loading range data...')).toBeNull();
    });

    expect(screen.getByText('Normal Range')).toBeTruthy();
    const minInput = screen.getByTestId('min-input') as HTMLInputElement;
    const maxInput = screen.getByTestId('max-input') as HTMLInputElement;
    expect(minInput.value).toBe('10.00');
    expect(maxInput.value).toBe('200.00');
  });
});
