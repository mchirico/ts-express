import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getS$ } from "./septa/septa";
import { publishMessage } from "./pubsub/pubsub";

import * as path from "path";

import { sendNewsletter } from "./notification/newsletter";
import { addPushSubscriber } from "./notification/add-push-subscriber.route";
import { readAllLessons } from "./notification/read-all-lessons.route";
import { FBK, db, ProcessTask } from "./firebasekick";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

export const getApp = (): Express => {
  // FIXME: clean up

  const processTask = new ProcessTask(db);
  const fbk = new FBK(db);
  processTask.process(fbk, "pomodoro/mchirico/tasks");

  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  const angularDirectoryPath = path.join(__dirname, "../static/html");

  app.use("/", express.static(angularDirectoryPath));

  app.get("/api/v1/test", (_, res) => {
    res.json({ ok: true });
  });

  app.get("/data", cors(corsOptions), function (req, res) {
    const heroes = [
      { id: 11, name: "Dr Nice" },
      { id: 12, name: "Narco" },
      { id: 13, name: "Bombasto" },
      { id: 14, name: "Celeritas" },
      { id: 15, name: "Magneta" },
      { id: 16, name: "RubberMan" },
      { id: 17, name: "Dynama" },
      { id: 18, name: "Dr IQ" },
      { id: 19, name: "Magma" },
      { id: 20, name: "Tornado" },
    ];
    res.json(heroes);
  });

  app.get("/push/topic", (_, res) => {
    const data = { tsExpress: "/push/topic" };
    publishMessage("topic-npubsub", JSON.stringify(data)).catch();
    res.json({ ok: true });
  });

  app.get("/trainview", (_, res) => {
    getS$.subscribe((x) => res.json(x));
  });

  app.get("/trainviewp", (_, res) => {
    getS$.subscribe((x) => res.jsonp(x));
  });

  app.route("/api/newsletter").post(sendNewsletter);
  app.route("/api/notifications").post(addPushSubscriber);
  app.route("/api/lessons").get(readAllLessons);

  // Default ... keep last
  app.use("*", express.static(angularDirectoryPath));
  return app;
};
