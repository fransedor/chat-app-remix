import { Link } from '@remix-run/react'

//export const action = async ({
//  request,
//}: ActionFunctionArgs) => {
//	const { destroySession, getSession } = await import('~/utils/session.server');
//  const session = await getSession(
//    request.headers.get("Cookie")
//  );
//  return redirect("/login", {
//    headers: {
//      "Set-Cookie": await destroySession(session),
//    },
//  });
//};

const LogOutButton = () => {
	return (
		<div>
			<Link to={"/logout"}>Logout</Link>
		</div>
	)
}

export default LogOutButton