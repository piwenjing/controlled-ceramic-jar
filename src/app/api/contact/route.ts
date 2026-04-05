import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, company, country, products, message } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the inquiry (in production, integrate with Resend or email service)
    console.log("New inquiry received:", {
      name,
      email,
      company,
      country,
      products,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with Resend SDK for email delivery
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@chengjingceramics.com',
    //   to: 'sales@chengjingceramics.com',
    //   subject: `New Inquiry from ${name}`,
    //   html: `...`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
