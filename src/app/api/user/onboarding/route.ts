// app/api/user/onboarding/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from '@/model/user.model'; // Adjust path as needed
import connectDB from '@/lib/dbConnect'; // Adjust path as needed

export async function POST(request: NextRequest) {
  try {
    // Get user from Kinde session
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { displayName, steamId, favoriteGenres, region, birthday, notificationPreferences, phone } = body;

    // Connect to MongoDB
    await connectDB();

    // Update user with onboarding data
    const updatedUser = await User.findOneAndUpdate(
      { email: kindeUser.email },
      {
        $set: {
          name: displayName || kindeUser.given_name || kindeUser.family_name || 'User',
          phone: phone || null,
          // You can add additional fields to your User model for these onboarding fields
          // For now, we'll just update the basic info
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: false }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // You might want to store the additional onboarding data in a separate collection
    // or extend your User model to include these fields

    return NextResponse.json({
      message: 'User onboarding completed successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isPhoneVerified: updatedUser.isPhoneVerified,
        wishlists: updatedUser.wishlists,
        friendList: updatedUser.friendList,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error updating user onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}