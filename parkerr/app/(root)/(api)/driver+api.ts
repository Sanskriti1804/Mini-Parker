import { neon } from "@neondatabase/serverless";

const mockDrivers = [
  {
    driver_id: 1,
    first_name: "James",
    last_name: "Wilson",
    profile_image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    rating: 4.8,
  },
  {
    driver_id: 2,
    first_name: "David",
    last_name: "Brown",
    profile_image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    car_seats: 5,
    rating: 4.6,
  },
  {
    driver_id: 3,
    first_name: "Michael",
    last_name: "Johnson",
    profile_image_url:
      "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
    car_image_url:
      "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
    car_seats: 4,
    rating: 4.7,
  },
];

// GET /driver — used by Map for nearby driver markers
export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Ensure table exists so Neon "relation does not exist" does not break home/map
    await sql`
      CREATE TABLE IF NOT EXISTS drivers (
        driver_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        profile_image_url TEXT,
        car_image_url TEXT,
        car_seats INTEGER,
        rating REAL
      )
    `;

    const existing = await sql`SELECT * FROM drivers`;
    if (existing.length === 0) {
      // Seed once so map markers have data
      for (const d of mockDrivers) {
        await sql`
          INSERT INTO drivers (driver_id, first_name, last_name, profile_image_url, car_image_url, car_seats, rating)
          VALUES (${d.driver_id}, ${d.first_name}, ${d.last_name}, ${d.profile_image_url}, ${d.car_image_url}, ${d.car_seats}, ${d.rating})
        `;
      }
      return Response.json({ data: mockDrivers });
    }

    return Response.json({ data: existing });
  } catch (error) {
    console.warn("drivers API fallback:", (error as Error)?.message ?? error);
    return Response.json({ data: mockDrivers });
  }
}
