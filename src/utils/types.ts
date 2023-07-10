import type { StructuredText } from "datocms-structured-text-utils";

export type IDable = {
  id: string;
};

export type Titleable = {
  title: string;
};

export type DiagramMini = IDable & Titleable;

export type Diagram<T> = {
  query: string;
  insight: StructuredText;
  data: T;
} & DiagramMini;

export type DiagramMiniListFetched = {
  allDiagrams: DiagramMini[];
};

export type DiagramFetched<T> = {
  allDiagrams: Diagram<T>[];
};
