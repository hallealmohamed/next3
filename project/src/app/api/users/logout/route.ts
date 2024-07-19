import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers';




// get
// @route ~/api/users/logout
// @desc Log out a user
// @access Public

export async function GET(request: NextRequest) {
    try {

        cookies().delete('jwtToken');
        return NextResponse.json({ message: "log out" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message:'Internal Server Error' }, { status: 500 });
    }
}