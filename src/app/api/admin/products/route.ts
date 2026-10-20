
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 1. Read the session cookie on the server
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return NextResponse.json(
      { message: "Please sign in first." },
      { status: 401 }
    );
  }

  // 2. Get the backend URL
  const apiUrl = process.env.AUTH_BACKEND_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { message: "Backend API URL is not configured." },
      { status: 500 }
    );
  }

  // 3. Read the product details submitted by the form
  let productData;

  try {
    productData = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    // 4. Forward the request to Express
    const backendResponse = await fetch(`${apiUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.value}`,
      },
      body: JSON.stringify(productData),
      cache: "no-store",
    });

    // 5. Forward the backend's response to the frontend
    const responseText = await backendResponse.text();

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      result = {
        message: "The backend returned an unexpected response.",
      };
    }

    return NextResponse.json(result, {
      status: backendResponse.status,
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to connect to the backend." },
      { status: 502 }
    );
  }
}
