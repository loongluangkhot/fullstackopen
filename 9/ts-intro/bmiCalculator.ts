interface ICalculateBmiParams {
  height: number;
  weight: number;
}

const parseCalculateBmiArguments = (
  args: Array<string>
): ICalculateBmiParams => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (heightInCm: number, weightInKg: number): string => {
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

if(require.main === module) {
  const calculateBmiParams = parseCalculateBmiArguments(process.argv);
  console.log(
    calculateBmi(calculateBmiParams.height, calculateBmiParams.weight)
  );
}
