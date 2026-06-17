const request = require("supertest");
const express = require("express");
require("dotenv").config();

const db = require("../config/db");
const livresRoutes = require("../routes/livresRoutes");

const app = express();
app.use(express.json());
app.use("/api/livres", livresRoutes);

afterAll((done) => {
  db.end(done);
});

describe("Tests API Express", () => {
  it("GET /api/livres doit renvoyer un tableau", async () => {
    const res = await request(app).get("/api/livres");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/livres/emprunts sans email doit renvoyer une erreur 400", async () => {
    const res = await request(app).get("/api/livres/emprunts");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email/i);
  });

  it("GET /api/livres/emprunts avec email doit renvoyer un tableau", async () => {
    const res = await request(app).get(
      "/api/livres/emprunts?email=user@mail.com"
    );

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
