import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const nthDiagram = params.id;
  const file = path.join(process.cwd(), `data/${nthDiagram}.json`);
  const stringified = readFileSync(file, "utf8");
  return NextResponse.json({ data: stringified });
}
