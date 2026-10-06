
"use client";

import { signUp } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const { data: userData, error } = await signUp.email({
      name: data.name as string,
      image: data.image as string,
      email: data.email as string,
      password: data.password as string,
    });

    if (userData) {
      console.log("সাইন আপ সফল হয়েছে:", userData);

      router.push("/");
    }

    if (error) {
      console.log("সাইন আপ ব্যর্থ হয়েছে:", error.message);
    }
  };

  return (
    <Form
      className="w-full max-w-sm mx-auto my-12 px-4"
      onSubmit={onSubmit}
    >
      <Fieldset>

        {/* Header Title */}
        <h1 className="text-2xl font-bold text-red-700 text-center mb-6">
          সাইন আপ
        </h1>

        <FieldGroup className="space-y-4">

          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label className="text-gray-700 font-medium text-sm mb-1 block">
              নাম
            </Label>

            <Input
              placeholder="আপনার নাম লিখুন"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
            />

            <FieldError />
          </TextField>

          {/* Image */}
          <TextField name="image">
            <Label className="text-gray-700 font-medium text-sm mb-1 block">
              Image URL
            </Label>

            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
            />

            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
          >
            <Label className="text-gray-700 font-medium text-sm mb-1 block">
              ইমেইল
            </Label>

            <Input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
            />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }

              return null;
            }}
          >
            <Label className="text-gray-700 font-medium text-sm mb-1 block">
              পাসওয়ার্ড
            </Label>

            <Input
              type="password"
              placeholder="কমপক্ষে ৬ অক্ষর"
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
            সাইন আপ করুন
          </Button>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-red-700 font-semibold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

      </Fieldset>
    </Form>
  );
};

export default SignUpPage;

