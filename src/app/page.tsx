// app/page.tsx
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main>
      <h1>Game Price Tracker</h1>
      <LoginLink>Login</LoginLink>
      <LogoutLink>Logout</LogoutLink>
    </main>
  );
}
