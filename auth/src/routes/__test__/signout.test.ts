import request from "supertest";
import { app } from "../../app";

describe("POST /api/users/signout", () => {
  it("clears the session after signing out", async () => {
    // Perform a dummy signin to create a session
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@example.com",
        password: "1234",
      })
      .expect(201);

    // Perform the signout request
    const response = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);

    // Assert that the session is cleared
    
    expect(response.get("Set-Cookie")[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly' );

    // Optionally, you can perform a follow-up request to check if the session is cleared
    // const getSessionResponse = await request(app)
    //   .get("/api/users/currentuser")
    //   .send()
    //   .expect(200);

    // // Assert that the current user is null or not authenticated
    // expect(getSessionResponse.body.currentUser).toBeNull();
  });
});
