import { getMe } from "../services/getMe";

export default async function HomePage() {
  const user = await getMe();
  console.log(user);
  return <div>Home</div>;
}
