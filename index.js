import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import db from "./src/config/db";
import route from "./src/routes";

const app = express();
const port = 3000;

// Cấu hình cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Cookie-parse
app.use(cookieParser());

// Xử lí form post lên
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Thư viện morgan
app.use(morgan("combined"));

// Kết nối database
db.connect();

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
