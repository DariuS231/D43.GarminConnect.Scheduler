export interface IScheduleContext {
  state: {};
  actions: {
    remove: (id: number) => Promise<void>;
    getAll: (year: number, month: number) => Promise<ICalendarMonth>;
  };
}

export interface IScheduleProps {}

export interface ICalendarMonth {
  startDayOfMonth: number;
  numOfDaysInMonth: number;
  numOfDaysInPrevMonth: number;
  month: number;
  year: number;
  calendarItems: ICalendarItem[];
}

export interface ICalendarItem {
  id: number;
  groupId: any;
  trainingPlanId?: number;
  itemType: string;
  activityTypeId?: number;
  wellnessActivityUuid: any;
  title: string;
  date: string;
  duration?: number;
  distance?: number;
  calories?: number;
  floorsClimbed: any;
  avgRespirationRate: any;
  unitOfPoolLength: any;
  weight: any;
  difference: any;
  courseId: any;
  courseName: any;
  sportTypeKey?: string;
  url: any;
  isStart: any;
  isRace: any;
  recurrenceId: any;
  isParent?: boolean;
  parentId: any;
  userBadgeId: any;
  badgeCategoryTypeId: any;
  badgeCategoryTypeDesc: any;
  badgeAwardedDate: any;
  badgeViewed: any;
  hideBadge: any;
  startTimestampLocal?: string;
  eventTimeLocal: any;
  diveNumber: any;
  maxDepth: any;
  avgDepth: any;
  surfaceInterval: any;
  elapsedDuration?: number;
  lapCount?: number;
  bottomTime: any;
  atpPlanId: any;
  workoutId?: number;
  protectedWorkoutSchedule: boolean;
  activeSets: any;
  strokes: any;
  noOfSplits?: number;
  maxGradeValue: any;
  totalAscent?: number;
  differenceStress: any;
  climbDuration?: number;
  maxSpeed?: number;
  averageHR?: number;
  activeSplitSummaryDuration?: number;
  maxSplitDistance?: number;
  maxSplitSpeed?: number;
  location: any;
  shareableEventUuid: any;
  splitSummaryMode: any;
  completionTarget: any;
  shareableEvent: boolean;
  primaryEvent: any;
  subscribed: any;
  phasedTrainingPlan?: boolean;
  autoCalcCalories?: boolean;
  decoDive?: boolean;
}
