import { Complexity } from "../types/types";

export default function colorComplexity(c: Complexity) {
  switch (c) {
    case "Simple":
      return "leetcode-olive";
    case "Moderate":
      return "leetcode-yellow";
    default:
      return "leetcode-red";
  }
}
