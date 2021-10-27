interface ICalculateExercisesParams {
  target: number;
  dailyExerciseHours: number[];
}

const parseCalculateExercisesArguments = (
  args: Array<string>
): ICalculateExercisesParams => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2]))) {
    const target = Number(args[2]);
    const dailyExerciseHours = [];
    for (let i = 3; i < args.length; i++) {
      if (!isNaN(Number(args[i]))) {
        dailyExerciseHours.push(Number(args[i]));
      } else {
        throw new Error("Provided values were not numbers!");
      }
    }
    return {
      target,
      dailyExerciseHours,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface IResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): IResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hr) => hr).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  let ratingDescription = "";
  switch (rating) {
    case 1:
      ratingDescription = "Taking too many rest days? Move it you lazy bum!";
      break;
    case 2:
      ratingDescription = "Almost hitting target! Try harder next time!";
      break;
    case 3:
      ratingDescription = "Looking ripped you absolute beast! Good job!";
      break;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const calculateExercisesParams = parseCalculateExercisesArguments(process.argv);
console.log(
  calculateExercises(
    calculateExercisesParams.dailyExerciseHours,
    calculateExercisesParams.target
  )
);
