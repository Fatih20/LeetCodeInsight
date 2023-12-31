import {
  AnalysisDataCore,
  AnalysisDataMiniListFetched,
  DiagramData,
} from "../types/types";

async function fetcher<T>(
  query: string
): Promise<{ error: any; result: null | { data: T } }> {
  try {
    const result = (await (
      await fetch(process.env.NEXT_PUBLIC_READ_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_READ_TOKEN}`,
        },
        body: JSON.stringify({
          query: query,
        }),
      })
    ).json()) as { data: T };
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
}

export async function analysisDataCoreFetcher(
  id: string
): Promise<{ allDiagrams: AnalysisDataCore[] }> {
  const query = `{
    allDiagrams (filter : {id : {eq : ${id}}}, orderBy : nth_ASC) {
      id
      nth
      title
      complexity
      insight {
        blocks
        links
        value
      }
      query
    }
  }
      `;
  const { error, result } = await fetcher<{ allDiagrams: AnalysisDataCore[] }>(
    query
  );
  if (error === null && result?.data) {
    return result.data as { allDiagrams: AnalysisDataCore[] };
  }

  throw new Error(`Failed to fetch analysis data core with ${id}`);
}

export async function allDiagramFetcher(): Promise<AnalysisDataMiniListFetched> {
  const query = `{
    allDiagrams (orderBy : nth_ASC) {
      id
      nth
      title
      complexity
  }
}
      `;
  const { error, result } = await fetcher<AnalysisDataMiniListFetched>(query);
  if (error === null && result?.data) {
    return result.data as AnalysisDataMiniListFetched;
  }

  throw new Error("Failed to fetch all analysis data core!");
}

export async function diagramDataFetcher<T>(
  nth: number
): Promise<{ allDiagrams: DiagramData<T>[] }> {
  const query = `{
    allDiagrams (filter : {nth : {eq : ${nth}}}) {
      data
    }
  }
      `;
  const { error, result } = await fetcher<{ allDiagrams: DiagramData<T>[] }>(
    query
  );
  if (error === null && result?.data) {
    return result.data as { allDiagrams: DiagramData<T>[] };
  }

  throw new Error(`Failed to fetch diagram data with ${nth}}`);
}
