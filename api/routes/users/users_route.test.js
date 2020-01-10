const server = require('../../server');
const db = require("../../../database/dbConfig")
const request = require("supertest")
const bcrypt = require("bcryptjs")

describe("server", () => {
    beforeEach(async () => {
        await db("users").truncate();
    })
    describe("post /api/register", () => {
        it("should return status of  201", () => {
            return request(server).post("/api/register")
                .send({
                    username: "tommy",
                    password: "password2"
                })
                .set("Content-Type", "application/json")
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })
})

describe("Post /api/login", () => {
    it("should return status of 200 ", async () => {

        await db("users").insert({
            username: "dumbuser1", password: bcrypt.hashSync("dumb", 8)
        })
        const res = await request(server).post("/api/login")
            .send({
                username: "dumbuser1",
                password: "dumb"
            })
            .set("Content-Type", "application/json")
        expect(res.status).toBe(200)

    });


})
