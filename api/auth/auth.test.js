// Bring in current env working configurations
const currentEnv = require("../../config/env").env
const config = require(`../../config/${currentEnv}config.json`)
const User = require("../../db/models/User/index")
const RefreshToken = require("../../db/models/RefreshToken/index")

// Bring in app, supertest and request
const app = require("../../app")
const request = require("supertest")

// Connect to DB before all tests
const mongoose = require("mongoose")

// Test route
describe("/api/v1/auth", () => {
  // Connect to the Test db before each test
  beforeAll(async (done) => {
    const url = `${config.testdbURL}`
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    done()
  })

  // Set timeout before each test
  beforeEach(async () => {
    jest.setTimeout(10000)
  })

  // Cleans up database between each test
  afterEach(async () => {
    // await User.deleteMany()
    // await RefreshToken.deleteMany()
  })
  // Removes the User & RefreshToken collection after all tests have run
  // Disconnects from test DB after all test
  afterAll(async () => {
    await mongoose.connection.close()
  })


  describe("/register", () => {
    // Test for successful data passed
    it("/register should create new user and refresh token in db", async done => {
      const newUser = {
        "email": "testing@gmail.com",
        "password": "password",
        "confirmPassword": "password"
      }
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(newUser)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual("User registered successfully")

      // Test that user has been created
      const user = await User.findOne({
        email: "testing@gmail.com"
      })
      expect(user.email).toBeTruthy()

      done()
    })
    // Test for incorrect email
    it("/register should return error for incorrect email", async done => {
      const newUser = {
        "email": "testing@gmailcom",
        "password": "password",
        "confirmPassword": "password"
      }
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(newUser)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty("errors")

      done()
    })
    // Test for different password and confirmPassword
    it("/register should return error for different password and confirmPassword", async done => {
      const newUser = {
        "email": "testing@gmailcom",
        "password": "passsword",
        "confirmPassword": "password"
      }
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(newUser)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty("errors")

      done()
    })
    // Test for short password
    it("/register should return error for password shorter than 8 characters", async done => {
      const newUser = {
        "email": "testing@gmailcom",
        "password": "pass",
        "confirmPassword": "pass"
      }
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(newUser)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty("errors")

      done()
    })
  })


  describe.only("/login", () => {
    // Test for successful user login and token created
    it("/login should log user in and create a token and refresh token", async done => {
      const user = {
        "email": "testing@gmail.com",
        "password": "password"
      }
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(user)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual("User logged in")
      expect(res.body.data).toHaveProperty("access-token")
      expect(res.body.data).toHaveProperty("refresh-token")
      expect(res.body.data).toHaveProperty("expiresIn")

      done()
    })
    
    // Test for nonexistent user email
    it("/login should return does not exist if email doesnt exist", async done => {
      const user = {
        "email": "testsing@gmail.com",
        "password": "password"
      }
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(user)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual("User does not exist")

      done()
    })
    
    // Test for wrong password
    it("/login should return error if password is wrong", async done => {
      const user = {
        "email": "testing@gmail.com",
        "password": "passwsord"
      }
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(user)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual("Wrong details")

      done()
    })
    
    // Test for wrong password
    it("/login should return error if password is wrong", async done => {
      const user = {
        "email": "testing@gmail.com",
        "password": "passwsord"
      }
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(user)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual("Wrong details")

      done()
    })
  })
})