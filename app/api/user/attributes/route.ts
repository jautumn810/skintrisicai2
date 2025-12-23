import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../lib/storage'

// PUT /api/user/attributes - Update user attributes (Phase 2)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, attributes } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (!attributes || typeof attributes !== 'object') {
      return NextResponse.json(
        { error: 'Attributes object is required' },
        { status: 400 }
      )
    }

    const updatedUser = storage.updateUserAttributes(userId, attributes)

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User attributes updated successfully',
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          attributes: updatedUser.attributes,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating user attributes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

