import { DiagramFetched, DiagramMiniListFetched } from "./types";

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

export async function diagramFetcher<T>(
  id: number
): Promise<DiagramFetched<T>> {
  const query = `{
    allDiagrams (filter : {id : {eq : ${id}}}) {
      id
      title
      insight {
        blocks
        links
        value
      }
      query
    }
  }
      `;
  const { error, result } = await fetcher<DiagramFetched<T>>(query);
  if (error === null && result?.data) {
    return result.data as DiagramFetched<T>;
  }

  throw new Error(`Failed to fetch home! ${id}`);
}

export async function allDiagramFetcher(): Promise<DiagramMiniListFetched> {
  const query = `{
    allDiagrams {
      id
      title
  }
}
      `;
  const { error, result } = await fetcher<DiagramMiniListFetched>(query);
  if (error === null && result?.data) {
    return result.data as DiagramMiniListFetched;
  }

  throw new Error("Failed to fetch all diagrams!");
}
