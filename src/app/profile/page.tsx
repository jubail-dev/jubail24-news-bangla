"use client";

import { authClient, useSession } from "@/lib/auth-client";
import {
  Button,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { useState } from "react";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  // Session loading
  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  }

  // User is not logged in
  if (!session?.user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-700">Profile</h1>

        <p className="text-gray-500 mt-2">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  const user = session.user;
  const sessionData = session.session;

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };
    const { data: updatedUser, error } = await authClient.updateUser({
      name: newUserData.name,
      image: newUserData.image,
    });
  };

  const handleEditProfile = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-700">My Profile</h1>

        <p className="text-sm text-gray-500 mt-1">
          View your account and session information
        </p>
      </div>

      {/* Profile Header */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Profile Image */}
          <div className="overflow-hidden rounded-full border-2 border-red-100">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-cover"
              />
            ) : (
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-red-700 text-white text-3xl font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">{user.email}</p>

            {/* Email Status */}
            <div className="mt-3">
              {user.emailVerified ? (
                <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-3 py-1 rounded-full">
                  ✓ Email Verified
                </span>
              ) : (
                <span className="inline-block bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-medium px-3 py-1 rounded-full">
                  Email Not Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="border border-gray-200 rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-red-700 mb-5">
          Account Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Full Name</p>

            <p className="text-sm font-medium text-gray-800">{user.name}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>

            <p className="text-sm font-medium text-gray-800 break-all">
              {user.email}
            </p>
          </div>

          {/* Account Created */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Account Created</p>

            <p className="text-sm font-medium text-gray-800">
              {new Date(user.createdAt).toLocaleString("en-BD", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* User ID */}
          <div>
            <p className="text-xs text-gray-500 mb-1">User ID</p>

            <p className="text-sm font-medium text-gray-800 break-all">
              {user.id}
            </p>
          </div>
        </div>
      </div>

      {/* Session Information */}
      <div className="border border-gray-200 rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-red-700 mb-5">Current Session</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Session Started */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Session Started</p>

            <p className="text-sm font-medium text-gray-800">
              {new Date(sessionData.createdAt).toLocaleString("en-BD", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* Session Expires */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Session Expires</p>

            <p className="text-sm font-medium text-gray-800">
              {new Date(sessionData.expiresAt).toLocaleString("en-BD", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* Browser */}
          <div className="sm:col-span-2">
            <p className="text-xs text-gray-500 mb-1">Browser & Device</p>

            <p className="text-sm font-medium text-gray-800 break-all">
              {sessionData.userAgent || "Not available"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        
        <Button
          onClick={() => handleEditProfile()}
          className="bg-red-700 hover:bg-red-800 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
        >
      
          Edit Profile
        </Button>
      </div>

      {/* Update Profile */}
      {showEditForm && (
        <div className="border border-gray-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-red-700 mb-5">
            Update Profile
          </h2>

          <Form onSubmit={handleUpdateUser}>
            <Fieldset className="w-full">
              <FieldGroup className="space-y-4">
                {/* Name Field */}
                <TextField name="name" defaultValue={""}>
                  <Label className="text-gray-700 font-medium text-sm mb-1 block">
                    নাম
                  </Label>
                  <Input className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700" />
                </TextField>

                {/* Image Field */}
                <TextField name="image" defaultValue={""}>
                  <Label className="text-gray-700 font-medium text-sm mb-1 block">
                    Profile Image URL
                  </Label>
                  <Input
                    type="url"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
                  />
                </TextField>
              </FieldGroup>

              {/* Update Button */}
              <Button
                type="submit"
                className="w-full mt-6 bg-red-700 hover:bg-red-800 text-white font-medium py-2.5 rounded transition-colors text-sm"
              >
                Update Profile
              </Button>
            </Fieldset>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
