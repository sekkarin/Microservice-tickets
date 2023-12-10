import request from "supertest";
import { app } from "../../app";

describe("POST /api/users/signin", () => {
  it('returns a 200 on successful signin', async () => {
    // Create a user for testing
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "password",
      })
      .expect(201);

    // Perform signin
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@example.com',
        password: 'password',
      })
      .expect(200);

    // Assert that the response contains the user data
    expect(response.body.email).toEqual('test@example.com');
    // Add more assertions based on your application's expected behavior
  });

  it("returns a 400 with invalid email", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "invalidemail",
        password: "password123",
      })
      .expect(400);
  });

  it("returns a 400 with missing password", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@example.com",
      })
      .expect(400);
  });

  it('returns a 400 with incorrect password', async () => {
    // Create a user for testing
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@example.com",
      password: "password",
    })
    .expect(201);

    // Perform signin with incorrect password
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@example.com',
        password: 'incorrectpassword',
      })
      .expect(400);
  });

  it("returns a 400 for an unknown user", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "unknown@example.com",
        password: "password123",
      })
      .expect(400);
  });
  it("responds with a cookie when given valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@example.com",
        password: "password",
      })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
