import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import { SchedulerSpeedDial } from './components/schedulerSpeedDial';
import { LoadingProvider } from './providers/loading';
import { WorkoutsProvider } from './providers/workouts';

const container = document.createElement('div');
container.setAttribute('id', 'root-chrome-ext');
document.body.appendChild(container);

const root = createRoot(container);

root.render(
  <WorkoutsProvider>
    <LoadingProvider>
      <App />
      <SchedulerSpeedDial />
    </LoadingProvider>
  </WorkoutsProvider>
);
