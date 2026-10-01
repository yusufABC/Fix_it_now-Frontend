import React from "react";
import { Card } from "@/components/ui/card";
import BanUserButton from "./BanUserButton";

export interface IAdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}

export default function UserModerationTable({ users }: { users: IAdminUserItem[] }) {
  return (
    <Card className="overflow-hidden border border-gray-200 bg-white rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-bold text-gray-500 tracking-wider">
            <tr>
              <th className="py-3.5 px-4">User</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Registered Date</th>
              <th className="py-3.5 px-4 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No users found in the system.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Name & Email */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </td>

                  {/* Role Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        user.role === "ADMIN"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : user.role === "TECHNICIAN"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        user.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Ban/Unban Action (Admins cannot ban other admins) */}
                  <td className="py-3.5 px-4 text-right">
                    {user.role !== "ADMIN" ? (
                      <BanUserButton userId={user.id} currentStatus={user.status} />
                    ) : (
                      <span className="text-xs text-gray-400 italic">Protected</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}