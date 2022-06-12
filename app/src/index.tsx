import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import { SchedulerSpeedDial } from './components/schedulerSpeedDial';
import { LoadingProvider } from './providers/loading';
import { WorkoutsProvider } from './providers/workouts';

const element = document.createElement('div');
element.setAttribute('id', 'root-chrome-ext');
document.body.appendChild(element);

const root = createRoot(element);

root.render(
  <WorkoutsProvider>
    <LoadingProvider>
      <App />
      <SchedulerSpeedDial />
    </LoadingProvider>
  </WorkoutsProvider>
);
