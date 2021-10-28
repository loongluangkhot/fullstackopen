import express from "express";
import { calculateBmi } from "./bmiCalculator";
import {
  calculateExercises,
  ICalculateExercisesParams,
} from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query as { height?: string; weight?: string };
  const heightNum = parseFloat(height || "");
  const weightNum = parseFloat(weight || "");
  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(heightNum, weightNum);
    res.json({
      weight: weightNum,
      height: heightNum,
      bmi,
    });
  }
});

app.post("/exercises", (req, res) => {
  console.log(req.body);
  const { daily_exercises, target } = req.body as ICalculateExercisesParams;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  } else {
    const errorInDailyExercises =
      !Array.isArray(daily_exercises) ||
      daily_exercises.some((hr) => isNaN(hr));
    const errorInTarget = isNaN(target);
    if (errorInDailyExercises || errorInTarget) {
      res.status(400).json({ error: "malformatted parameters" });
    } else {
      const val = calculateExercises(daily_exercises, target);
      res.json(val);
    }
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
