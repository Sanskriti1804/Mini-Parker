import { neon } from "@neondatabase/serverless";

// Neon client — DATABASE_URL must be in project-root .env (server-only, never EXPO_PUBLIC_)
const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(req: Request) {
  try {
    const { name, email, clerkId } = await req.json();

    //validate
    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    //perform opperation on db - result is an array of rows
    const result = await sql`
      INSERT INTO users (name, email, clerkId)
      VALUES (${name}, ${email}, ${clerkId})
        RETURNING *
    `;

    return Response.json(
      {
        data: result[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}
