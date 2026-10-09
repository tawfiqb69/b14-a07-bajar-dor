import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user;

  if(!user){
    return NextResponse.redirect(new URL("/signin", request.url));
  }

}

export const config = {
  matcher: ["/profile"],
};
