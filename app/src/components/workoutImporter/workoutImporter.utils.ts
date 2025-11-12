import { styled } from "@mui/material";
import { DictionaryString } from "../../providers/workouts";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const createWorkoutPayload = (uploadedJson: DictionaryString): DictionaryString => {
  const deleteProps = [
    "workoutId",
    "ownerId",
    "updatedDate",
    "createdDate",
    "author",
    "estimatedDurationInSecs",
    "estimatedDistanceInMeters",
    "workoutProvider",
    "workoutSourceId",
    "consumer",
    "consumerName",
    "consumerImageURL",
    "consumerWebsiteURL",
    "estimateType",
    "estimatedDistanceUnit",
  ];

  deleteProps.forEach((propName) => {
    if (uploadedJson[propName] !== undefined) {
      delete uploadedJson[propName];
    }
  });

  let segmentsNumber = uploadedJson["workoutSegments"].length;
  for (let x = 0; x < segmentsNumber; x++) {
    let segment = uploadedJson["workoutSegments"][x];
    for (let y = 0; y < segment["workoutSteps"].length; y++) {
      let workoutStep = segment["workoutSteps"][y];
      workoutStep["stepId"] = null;
      segment["workoutSteps"][y] = workoutStep;
    }
    uploadedJson["workoutSegments"][x] = segment;
  }

  return uploadedJson;
};
