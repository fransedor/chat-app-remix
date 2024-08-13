import { ActionFunctionArgs } from "@remix-run/node";
import MessageRepository from "~/repository/message/message.repository";
import { createResponse } from "~/utils/response.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return createResponse(null, "method not allowed", 405);
  }
  const messageBody = await request.json();

  try {
    await MessageRepository.AddNewMessage(messageBody);
    return createResponse("success", null, 200);
  } catch (err) {
    return createResponse(null, (err as Error).message, 500);
  }
}
