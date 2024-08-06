import { ActionFunctionArgs } from "@remix-run/node";
import MessageRepository from "~/repository/message/message.repository";
import { createResponse } from "~/utils/response.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const text = String(formData.get("text"));
  //const media_url = String(formData.get("media_url"));

  if (!text) {
    return;
  }
  try {
    await MessageRepository.AddNewMessage({
      text,
      media_url: "",
      room_id: "",
      user_id: "",
      username: "",
    });
    return createResponse("success", null, 200);
  } catch (err) {
    return createResponse(null, (err as Error).message, 500);
  }
}
