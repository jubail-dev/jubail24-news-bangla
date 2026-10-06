
"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  // Session loading
  if (isPending) {
    return (
      <div className="flex items-center justify-center md:justify-end">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center md:justify-end">
      {session?.user ? (
        <div className="flex items-center gap-3">
          {/* User Image */}
          <div className="overflow-hidden rounded-full border-2 border-red-100">
            {session.user.image ? (
              <Link href={"/profile"}>
                <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
              </Link>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center bg-red-700 text-sm font-semibold text-white">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Name */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {session.user.name}
            </p>
            <p className="text-xs text-gray-500">Welcome back</p>
          </div>

          {/* Sign Out */}
          <Button
            size="sm"
            className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/sign-in">
            <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-red-700">
              সাইন ইন
            </button>
          </Link>

          <Link href="/sign-up">
            <button className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
