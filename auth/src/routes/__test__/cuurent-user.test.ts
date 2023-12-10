import request from "supertest";
import { app } from "../../app";
// import { response } from "express";

describe("GET /api/users/currentuser", () => {
  it("responds with the current user if authenticated", async () => {
    // Perform a dummy signin to create a session
    const cookie = await global.signin();
    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send()
      .expect(200);
    // console.log(response.body);
    expect(response.body.currentUser.email).toEqual("test@example.com");
  });
  // console.log(response);โ

  it("responds with null if not authenticated", async () => {
    // Perform the currentuser request without a valid session
    const response = await request(app)
      .get("/api/users/currentuser")
      .send()
      .expect(200);

    // Assert that the current user is null
    expect(response.body.currentUser).toBeNull();
  });
});
