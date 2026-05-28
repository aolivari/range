import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (type === 'fixed') {
    return NextResponse.json({ 
      rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] 
    });
  }

  // Return normal range by default
  return NextResponse.json({ min: 1, max: 100 });
}
