interface ICalculateBmiParams {
  heightInCm: number;
  weightInKg: number;
}

const parseCalculateBmiArguments = (
  args: Array<string>
): ICalculateBmiParams => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const bmi = weightInKg / ((heightInCm / 100) ^ 2);
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

const calculateBmiParams = parseCalculateBmiArguments(process.argv);
console.log(
  calculateBmi(calculateBmiParams.heightInCm, calculateBmiParams.weightInKg)
);
