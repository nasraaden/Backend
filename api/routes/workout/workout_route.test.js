const server = require('../../server');
const db = require("../../../database/dbConfig")
const request = require("supertest")

describe("workouts", () => {

    let workoutid;
    it("post", async () => {
        const res = await request(server).post("/api/workouts")
            .send({
                user_id: 1,
                name: "latpulldowns",
                region: "lats",
                date: "1/9/2020",
                weight: 350,
                reps: 25
            })
        workoutid = res.body.id;
        expect(res.status).toBe(201);
    });
    it('put', async () => {
        const res = await request(server).put(`/api/workouts/${workoutid}`)
            .send({
                user_id: 1,
                name: "latpulldowns",
                region: "lats",
                date: "1/9/2020",
                weight: 40,
                reps: 55
            });
        expect(res.status).toBe(200);
    });
    it("get", async () => {
        const res = await request(server).get(`/api/workouts/${workoutid}`)
        expect(res.status).toBe(200);
    });

    it("delete", async () => {
        const res = await request(server).delete(`/api/workouts/${workoutid}`)
        expect(res.status).toBe(204);
    });

})
