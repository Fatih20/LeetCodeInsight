const possiblePremiumStatuses = ["Free", "Premium"] as const;

type PremiumStatus = (typeof possiblePremiumStatuses)[number];

const possibleDifficulty = ["Easy", "Hard", "Medium"] as const;

type Difficulty = (typeof possibleDifficulty)[number];

const possibleSolution = ["ReadUp", "None", "Video"] as const;

type SolutionType = (typeof possibleSolution)[number];

const possibleAcceptanceRateCategory = [
  "Very Low Acceptance",
  "Low Acceptance",
  "High Acceptance",
  "Very High Acceptance",
];

type AcceptanceRateCategory = (typeof possibleAcceptanceRateCategory)[number];
