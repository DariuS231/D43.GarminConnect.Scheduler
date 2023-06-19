import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import { SchedulerSpeedDial } from "./components/schedulerSpeedDial";
import { ActivitiesProvider } from "./providers/activities";
import { GarminApiProvider } from "./providers/garminApi";
import { LoadingProvider } from "./providers/loading";
import { ScheduleProvider } from "./providers/schedule";
import { WorkoutsProvider } from "./providers/workouts";

const element = document.createElement("div");
element.setAttribute("id", "root-chrome-ext");
document.body.appendChild(element);

const root = createRoot(element);

root.render(
  <GarminApiProvider>
    <WorkoutsProvider>
      <ScheduleProvider>
      <ActivitiesProvider>
        <LoadingProvider>
          <App />
          <SchedulerSpeedDial />
        </LoadingProvider>
      </ActivitiesProvider>
      </ScheduleProvider>
    </WorkoutsProvider>
  </GarminApiProvider>
);
