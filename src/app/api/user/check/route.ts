// app/api/user/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from '@/model/user.model'; // Adjust path as needed
import connectDB from '@/lib/dbConnect'; // Adjust path as needed

export async function GET(request: NextRequest) {
  try {
    // Get user from Kinde session
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Connect to MongoDB
    await connectDB();

    // Check if user exists in database
    let user = await User.findOne({ email: kindeUser.email });
    let isNewUser = false;

    if (!user) {
      // Create new user
      user = new User({
        name: kindeUser.given_name || kindeUser.family_name || 'User',
        email: kindeUser.email,
        phone: null,
        isPhoneVerified: false,
        wishlists: [],
        friendList: [],
      });

      await user.save();
      isNewUser = true;
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isPhoneVerified: user.isPhoneVerified,
        wishlists: user.wishlists,
        friendList: user.friendList,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      isNewUser,
    });
  } catch (error) {
    console.error('Error checking/creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}