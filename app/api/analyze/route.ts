import { NextRequest, NextResponse } from 'next/server'

// POST /api/analyze - Analyze image and return predictions (Phase 2)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const userId = formData.get('userId') as string

    if (!image) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      )
    }

    // Validate image type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate image size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (image.size > maxSize) {
      return NextResponse.json(
        { error: 'Image size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Convert image to base64 for processing
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Image = buffer.toString('base64')
    const imageDataUrl = `data:${image.type};base64,${base64Image}`

    // TODO: Integrate with actual AI/ML service for face analysis
    // For now, return mock data structure as specified in Phase 2 requirements
    // The API should return: demographics, age, scores, Room, Page, Plausibility, Week

    const analysisResult = {
      demographics: {
        gender: 'Unknown', // AI prediction
        ethnicity: 'Unknown', // AI prediction
      },
      age: 25, // AI prediction (estimated age)
      scores: {
        skinHealth: 75, // AI prediction score (0-100)
        hydration: 70,
        texture: 80,
      },
      room: 'Standard', // AI prediction
      page: '1', // AI prediction
      plausibility: 85, // AI prediction confidence (0-100)
      week: 1, // Week number
      skinType: 'Combination', // AI prediction (e.g., "Dry", "Oily", "Combination", "Normal", "Sensitive")
      cosmeticConcerns: ['Acne', 'Fine Lines'], // AI prediction
      weather: 'Moderate', // AI prediction
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Image analyzed successfully',
        data: {
          userId: userId || null,
          analysis: analysisResult,
          imagePreview: imageDataUrl, // Return base64 for preview
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error analyzing image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

