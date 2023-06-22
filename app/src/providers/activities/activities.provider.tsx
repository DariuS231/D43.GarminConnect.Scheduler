import * as React from "react";
import { ActivitiesContext, IActivitiesProps, IActivity } from ".";
import { GarminApiContext, getDateFormat } from "../garminApi";
import { WORKOUTS_MOCK } from "./activities.mock";

export const ActivitiesProvider = (
  props: React.PropsWithChildren<IActivitiesProps>
): JSX.Element => {
  const { actions, state } = React.useContext(GarminApiContext);

  const defaultParams = [
    { key: "activityType", value: "running" },
    { key: "search", value: "" },
    { key: "excludeChildren", value: "false" },
    { key: "_", value: "1677537611110" },
  ];
  const get = async (
    take: number = 100,
    skip: number = 0,
    from?: Date,
    to?: Date
  ): Promise<IActivity[]> => {
    let params = [
      ...defaultParams,
      { key: "limit", value: take.toString() },
      { key: "start", value: skip.toString() },
    ];

    if (from) {
      params.push({ key: "startDate", value: getDateFormat(from) });
    }

    if (to) {
      params.push({ key: "endDate", value: getDateFormat(to) });
    }

    if (state.isLocalHost) {
        await actions.wait(3000);
        return WORKOUTS_MOCK;
      }
  

    const queryString = params.map((i) => `${i.key}=${i.value}`).join("&");
    const activities = await actions.get<IActivity[]>(
      `/activitylist-service/activities/search/activities?${queryString}`
    );

    return activities;
  };
  const value = {
    state: {  },
    actions: { get },
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {props.children}
    </ActivitiesContext.Provider>
  );
};
