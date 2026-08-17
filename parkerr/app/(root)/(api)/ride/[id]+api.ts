import { neon } from "@neondatabase/serverless";

// GET /ride/:id — used by Home + Rides tabs for a user's ride history
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    const resolved = await Promise.resolve(params);
    const id = resolved?.id;

    if (!id || id === "undefined") {
      return Response.json({ data: [] });
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    // Ensure rides table exists so missing relation does not 500 the UI
    await sql`
      CREATE TABLE IF NOT EXISTS rides (
        ride_id SERIAL PRIMARY KEY,
        origin_address TEXT,
        destination_address TEXT,
        origin_latitude REAL,
        origin_longitude REAL,
        destination_latitude REAL,
        destination_longitude REAL,
        ride_time INTEGER,
        fare_price REAL,
        payment_status VARCHAR(50),
        driver_id INTEGER,
        user_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    const response = await sql`
      SELECT
        rides.ride_id,
        rides.origin_address,
        rides.destination_address,
        rides.origin_latitude,
        rides.origin_longitude,
        rides.destination_latitude,
        rides.destination_longitude,
        rides.ride_time,
        rides.fare_price,
        rides.payment_status,
        rides.created_at,
        json_build_object(
          'first_name', COALESCE(drivers.first_name, 'Driver'),
          'last_name', COALESCE(drivers.last_name, ''),
          'car_seats', COALESCE(drivers.car_seats, 4)
        ) AS driver
      FROM rides
      LEFT JOIN drivers ON rides.driver_id = drivers.driver_id
      WHERE rides.user_id = ${id}
      ORDER BY rides.created_at DESC
    `;

    return Response.json({ data: response });
  } catch (error) {
    console.warn("rides API fallback:", (error as Error)?.message ?? error);
    return Response.json({ data: [] });
  }
}
