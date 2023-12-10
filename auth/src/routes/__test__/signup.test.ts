import request from "supertest";
import { app } from "../../app";

describe("POST /api/users/signup", () => {
  it("returns a 201 on successful signup", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "1234",
      })
      .expect(201);
  });

  it("returns a 400 with invalid email", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "invalidemail",
        password: "1234",
      })
      .expect(400);
  });

  it("returns a 400 with invalid password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "12", // Invalid password length
      })
      .expect(400);
  });

  it("returns a 400 with missing email and password", async () => {
    await request(app).post("/api/users/signup").send({}).expect(400);
  });

  it("disallows duplicate emails", async () => {
    // Create a user with the same email first
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "1234",
      })
      .expect(201);

    // Try to create another user with the same email
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "5678",
      })
      .expect(400);
  });
  it("sets a cookie after login", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "1234",
      })
      .expect(201);
    expect(res.get("Set-Cookie")).toBeDefined()
  });
});
