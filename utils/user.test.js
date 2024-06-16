const request = require("supertest");
const app = require("../server");
const User = require("../models/userModel");

describe("User API", () => {
  beforeAll(async () => {
    await User.destroy({ where: { email: "test@example.com" } });
  
  });

  afterAll(async () => {
    // Close the server
    await app.close();
  });

  // Test for new registration
  it("should check the request body", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(400);
  });

  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "test name",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Registered successfully");
  });

  it("should not create a user with existing email", async () => {
    await request(app).post("/api/v1/user/register").send({
      name: "existing user",
      email: "existing@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/v1/user/register").send({
      name: "existing user",
      email: "existing@example.com",
      password: "password123",
    });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("error", "User already registered");
  });

  it("should not login with incorrect password", async () => {
    const res = await request(app).post("/api/v1/user/signin").send({
      email: "existing@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Password is incorrect.");
  });

  it("should check if user is registered or not", async () => {
    const res = await request(app).post("/api/v1/user/signin").send({
      email: "unknown@example.com",
      password: "password123",
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "User is not registered");
  });

  it("should authenticate user by checking password", async () => {
    await request(app).post("/api/v1/user/register").send({
      name: "Akash",
      email: "akash@example.com",
      password: "password",
    });

    const res = await request(app).post("/api/v1/user/signin").send({
      email: "akash@example.com",
      password: "password",
    });

    expect(res.status).toBe(200);
    const token = res.body;
    expect(token).toBeDefined();
  });
});
