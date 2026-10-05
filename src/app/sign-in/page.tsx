"use client";
import Link from "next/link";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/server/api-utils";
const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {email: string, password: string}
    const {data:userData,error} = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true as boolean,
      callbackURL: "/" as string,
    })
    
    if(userData){
      console.log("সাইন ইন সফল হয়েছে:", userData);
     
    }
    if(error){
      console.log("সাইন ইন ব্যর্থ হয়েছে: " + error.message);
    }
  };
  return (
    <Form className="w-full max-w-sm mx-auto my-12 px-4" onSubmit={onSubmit}>
      <Fieldset>
        {/* Header Title */}
        <h1 className="text-2xl font-bold text-red-700 text-center mb-6">
          সাইন ইন
        </h1>

        <FieldGroup className="space-y-4">
          {/* 1. Email Field */}
          <TextField isRequired name="email" type="email">
            <Label className="text-gray-700 font-medium text-sm mb-1 block">
              ইমেইল
            </Label>
            <Input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
            />
            <FieldError />
          </TextField>

          {/* 2. Password Field */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (!value) {
                return "Password is required";
              }
              return null;
            }}
          >
            <Label className="text-gray-700 font-medium text-sm mb-1 block">
              পাসওয়ার্ড
            </Label>
            <Input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
            />
            <FieldError />
          </TextField>
        </FieldGroup>

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-2.5 rounded transition-colors text-sm"
          >
            সাইন ইন করুন
          </Button>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-red-700 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </Fieldset>
    </Form>
  );
};

export default SignInPage;
