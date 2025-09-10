import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simulate some processing time
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get query parameters
  const { searchParams } = new URL(request.url);
  const shouldError = searchParams.get('error');
  
  // Simulate error response for testing
  if (shouldError === 'true') {
    return NextResponse.json(
      {
        message: 'This is a simulated error for testing error handling',
        success: false,
      },
      { status: 400 }
    );
  }

  // Return success response
  return NextResponse.json({
    data: {
      message: 'API test successful!',
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substr(2, 9),
    },
    success: true,
    message: 'Request processed successfully',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simulate validation error
    if (body.shouldError) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: {
            name: ['Name is required'],
            email: ['Email format is invalid'],
          },
          success: false,
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
        createdAt: new Date().toISOString(),
      },
      success: true,
      message: 'Data created successfully',
    });
  } catch {
    return NextResponse.json(
      {
        message: 'Failed to process request',
        success: false,
      },
      { status: 500 }
    );
  }
}