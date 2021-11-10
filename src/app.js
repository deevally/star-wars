import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import log from "./utils/logger";
import routes from "./routes/routes";
import exposeService from './services/index.service'
dotenv.config();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json"
  );
  next();
});
// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

//logger
app.use(logger("combined"));

// const hppProtector = (req, res, next) => {
//   Object.keys(req.query).map(key => {
//       if (typeof req.query[key] !== 'string') {
//           if (Array.isArray(req.query[key]))
//               req.query[key] = req.query[key][0]
//           else {
//               return res.status(400).json({ error: "Bad parameters" })
//           }
//       }
//   })
//   next()
// }

//app.use(hppProtector)
// Prevent http param pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

app.use(limiter);

// Parse incoming requests data
app.use((req, res, next) => {
  express.json()(req, res, err => {
      if (err) {
        return res.status(400).json({
          message: "Invalid JSON payload passed.",
          status: "error",
          data: null
      })
      }
      next();
  });
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// base api

app.use("/api/star-wars",exposeService, routes);


// CATCH ALL INVALID ROUTES
app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route"
  });
  next();
});





process.on("uncaughtException", (err) => {
    log.info(err.message);
    //console.log(err)
    process.exit(0);
  });
  
  process.on('uncaughtExceptionMonitor', (err, origin) => {
      log.info(err.message);
      process.exit(0);
  });
  process.on("unhandledRejection", (err) => {
    log.info(err.message);
    //console.log(err)

    process.exit(0);
  });

 
export default  app;
