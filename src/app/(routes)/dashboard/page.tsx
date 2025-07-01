import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function AdminCheckPage() {
  const { getUser, getClaim } = getKindeServerSession();

  const user = await getUser();
  const rolesClaim = await getClaim("roles");

  // Safely parse role objects
  const rawRoles = rolesClaim?.value;
  const roles = Array.isArray(rawRoles) ? rawRoles : [];

  // Check if admin role is present
  const isAdmin = roles.some((role: any) => role?.key === "admin");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Check</h1>
      {isAdmin ? (
        <p className="text-green-600 mt-2">✅ You are an Admin</p>
      ) : (
        <p className="text-red-600 mt-2">❌ You are not an Admin</p>
      )}

      <div className="mt-4">
        <h2 className="text-md font-semibold">Your Roles:</h2>
        <pre className="bg-gray-100 p-2 rounded mt-1">
          {JSON.stringify(roles, null, 2)}
        </pre>
      </div>
    </div>
  );
}
