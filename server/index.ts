import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { searchUsers } from "./controllers/users";
import { validateUserSearch } from "./validators/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

let timeout: ReturnType<typeof setTimeout>;

app.get("/api/users", validateUserSearch, (req: Request, res: Response) => {
  const { email, number } = req.query;

  // cancel previous request
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    try {
      const users = await searchUsers(email as string, number as string);

      return res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }, 5000);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
