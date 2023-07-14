import type { StructuredText } from "datocms-structured-text-utils";

export type IDable = {
  id: string;
};

export type Titleable = {
  title: string;
};

const complexityList = ["Simple", "Moderate", "Complicated"] as const;

export type Complexity = (typeof complexityList)[number];

export type AnalysisDataMini = IDable &
  Titleable & { complexity: Complexity } & { nth: number };

export type AnalysisDataCore = {
  query: string;
  insight: StructuredText;
} & AnalysisDataMini;

export type AnalysisDataMiniListFetched = {
  allDiagrams: AnalysisDataMini[];
};

export type DiagramData<T> = {
  data: T;
};

export type RawDiagramData<T> = { allDiagrams: DiagramData<T>[] };
