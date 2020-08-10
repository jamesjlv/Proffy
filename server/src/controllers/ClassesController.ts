import { Request, Response } from "express";

import db from "../database/db"; //Call the Pool from Database
import convertHourToMinutes from "../utils/utils"; // biblio to convert the hours to minutos after save in the database
import format from "pg-format"; // biblio to format the query with a array

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    try {
      const filters = req.query;
      let timeInMinutes = 0;
      if (!filters.week_day && !filters.subject && !filters.time) {
        return res.status(400).json({
          error: "Missing filters to search classes",
        });
      }

      let query = `SELECT DISTINCT ON (users.name) classes.subject,classes.cost,users.name,users.avatar,users.id, users.bio,users.whatsapp FROM classes
                     LEFT JOIN class_schedule ON (class_schedule.class_id = classes.id)
                     LEFT JOIN users ON (classes.user_id = users.id)
                     WHERE`;
      if (filters.week_day) {
        query = `${query} class_schedule.week_day='${filters.week_day}'`;
      }
      if (filters.subject) {
        if (filters.week_day) {
          query = `${query} AND classes.subject ILIKE '%${filters.subject}%' `;
        } else {
          query = `${query} classes.subject ILIKE '%${filters.subject}%' `;
        }
      }
      if (filters.time) {
        timeInMinutes = convertHourToMinutes(filters.time as string);
        if (filters.subject || filters.week_day) {
          query = `${query} AND class_schedule.from <= ${timeInMinutes} and class_schedule.to >= ${timeInMinutes} `;
        } else {
          query = `${query} class_schedule.from <= ${timeInMinutes} and class_schedule.to >= ${timeInMinutes} `;
        }
      }

      query = `${query} ORDER BY users.name ASC`;
      let results = await db.query(query);

      return res.status(201).json(results.rows);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        error: "Unexpected error while looking for a class",
      });
    }
  }
  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;
    try {
      // Start a transaction
      await db.query("BEGIN");

      // Insert the user
      let value = [name, avatar, whatsapp, bio];
      let query = `INSERT INTO users(name,avatar,whatsapp,bio) VALUES ($1,$2,$3,$4) RETURNING id`;
      let result = await db.query(query, value);
      const userIdCreated = result.rows[0].id;

      //inserir the type of class and your cost with user_id
      value = [subject, cost, userIdCreated];
      query = `INSERT INTO classes(subject,cost,user_id) VALUES ($1,$2,$3) RETURNING id`;
      result = await db.query(query, value);
      const class_Id = result.rows[0].id;

      //Convert the time of the class to minutes
      const ClassesValue = schedule.map((scheduleItem: ScheduleItem) => {
        return [
          scheduleItem.week_day,
          convertHourToMinutes(scheduleItem.from),
          convertHourToMinutes(scheduleItem.to),
          class_Id,
        ];
      });

      // Insert the class schedule
      query = format(
        `INSERT INTO class_schedule("week_day","from","to","class_id") VALUES %L RETURNING id`,
        ClassesValue
      );
      await db.query(query);

      //Insert all the changes if have no error
      await db.query("COMMIT");

      return res.status(201).send();
    } catch (err) {
      // Rollback the insert if have any errors
      await db.query("ROLLBACK");
      console.error(err);
      return res.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}
