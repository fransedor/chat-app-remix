import { ActionFunction, json, redirect } from "@remix-run/node";
import RoomService from "~/service/room.service";
import { getUserIdFromSession } from "~/utils/getUserIdFromSession";

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();

  const chattedId = formData.get("chattedId");

  if (typeof chattedId !== "string" || chattedId.trim() === "") {
    return json({ error: "Room name is required" }, { status: 400 });
  }

  try {
    // Create a new room in the database
    const roomId = await RoomService.createNewRoom(userId, chattedId);

    // Redirect to the rooms list or newly created room page
    return redirect(`/${roomId.toString()}`);
  } catch (error) {
    return json({ error: (error as Error).message }, { status: 500 });
  }
};
