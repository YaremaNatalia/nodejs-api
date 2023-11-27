import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";

const { DB_TEST_HOST, PORT } = process.env;

describe("test /users routes", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await User.deleteMany(); // очищення колекції users (яка повязана з моделлю User через Mongoose схему) після всіх тестів
    await mongoose.connection.close();
    server.close();
  });

  //   beforeEach(() => {});
  //   afterEach(async () => {
  //     await User.deleteMany();
  //   }); // очищення після кожного тесту

  test("test /users/register with correctData", async () => {
    const registerData = {
      email: "natalka@example.com",
      password: "123456",
    };
    const { body, statusCode } = await request(app)
      .post("/users/register")
      .send(registerData);

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(registerData.email);
    expect(body.user).toHaveProperty("subscription");
    expect(body.user).toHaveProperty("avatarURL");

    const user = await User.findOne({ email: registerData.email }); // перевірка чи зареєструвались дані користувача  в базі емейлу
    expect(user.email).toBe(registerData.email);
  });

  test("test /users/login request", async () => {
    const loginData = {
      email: "natalka@example.com",
      password: "123456",
    };

    const { body, statusCode } = await request(app)
      .post("/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(loginData.email);
    expect(body).toHaveProperty("token");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
