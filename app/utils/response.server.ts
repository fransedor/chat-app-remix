import { json } from "@remix-run/node";

export const createResponse = <T>(data: T, error: string | null, status: number) => {
  return json(
    {
      data,
      error,
      status,
    },
    { status }
  );
};
