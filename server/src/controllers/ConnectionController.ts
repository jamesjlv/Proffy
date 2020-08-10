import { Request, Response } from "express";
import db from "../database/db";

export default class ConnectionController {
  async index(req: Request, res: Response) {
    try {
      let results = await db.query("SELECT count(*) from connections");
      // results = {results.rows[0].count}
      res.status(201).json(results.rows[0]);
    } catch (err) {
      res.status(400).json({
        error: "Its not possible to catch the numbers of connections",
      });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({
          error: "Error to insert the connection, we dont know the user",
        });
      }
      await db.query(`INSERT INTO connections(user_id) VALUES ('${user_id}')`);
      res.status(201).send();
    } catch (err) {
      console.error(err);
      res.status(400).json({
        error: "Error to insert the connection",
      });
    }
  }
}
