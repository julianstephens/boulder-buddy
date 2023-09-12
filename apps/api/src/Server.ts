import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/passport";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/swagger";
import session from "express-session";
import { join } from "path";
import { config } from "./config/index";
import * as pages from "./controllers/pages/index";
import * as rest from "./controllers/rest/index";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  mount: {
    "/rest": [...Object.values(rest)],
    "/": [...Object.values(pages)],
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1",
    },
  ],
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } },
    session({
      secret: "test",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    }),
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
