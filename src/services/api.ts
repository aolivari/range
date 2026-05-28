export interface NormalRangeResponse {
  min: number;
  max: number;
}

export interface FixedRangeResponse {
  rangeValues: number[];
}

export const getNormalRange = async (): Promise<NormalRangeResponse> => {
  const response = await fetch('/api?type=normal');
  if (!response.ok) throw new Error('Failed to fetch normal range');
  return response.json();
};

export const getFixedRange = async (): Promise<FixedRangeResponse> => {
  const response = await fetch('/api?type=fixed');
  if (!response.ok) throw new Error('Failed to fetch fixed range');
  return response.json();
};
