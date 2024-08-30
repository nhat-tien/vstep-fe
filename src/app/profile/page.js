import getProfile from "@/services/getProfile"
import { redirect } from "next/navigation";

export default async function Page() {
  const profile = await getProfile();
  if(profile.message == "Unauthenticated.") {
    redirect("/");
  }
  return (
     <div>
      <h2>{profile.name}</h2>
      <h3>{profile.email}</h3>
      <h3>{profile.phoneNumber}</h3>
    </div>
  )
}
