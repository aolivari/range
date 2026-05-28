import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { getNormalRange, getFixedRange } from './api';

describe('API Service', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.fetch = jest.fn() as any;
  });

  test('getNormalRange fetches and returns normal range data', async () => {
    const mockResponse = { min: 1, max: 100 };
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as any)
    );

    const data = await getNormalRange();
    expect(global.fetch).toHaveBeenCalledWith('/api?type=normal');
    expect(data).toEqual(mockResponse);
  });

  test('getFixedRange fetches and returns fixed range data', async () => {
    const mockResponse = { rangeValues: [1.99, 5.99] };
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as any)
    );

    const data = await getFixedRange();
    expect(global.fetch).toHaveBeenCalledWith('/api?type=fixed');
    expect(data).toEqual(mockResponse);
  });

  test('throws error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: false,
      } as any)
    );

    await expect(getNormalRange()).rejects.toThrow('Failed to fetch normal range');
  });
});
