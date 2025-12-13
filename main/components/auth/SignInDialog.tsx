"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDialogsStore from "@/lib/dialogsStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserSignInSchema,
  UserSignInType,
  UserSignUpSchema,
  UserSignUpType,
  UserType,
} from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUserStore } from "@/lib/userStore";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { interestTags } from "@/lib/constants";

export default function SignInDialog() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<UserSignInType>({
    resolver: zodResolver(UserSignInSchema),
  });

  const signInFormOpen = useDialogsStore((state) => state.signInFormOpen);
  const setSignUpForm = useDialogsStore((state) => state.setSignUpForm);
  const setSignInForm = useDialogsStore((state) => state.setSignInForm);
  const setEmailPassword = useUserStore((state) => state.setEmailPassword);

  const submit: SubmitHandler<UserSignInType> = async (
    dataReturned: UserSignInType
  ) => {
    console.log(dataReturned);
    try {
      const { email, password } = dataReturned;
      const { data, error } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/",
        },
        {
          onRequest: (ctx) => {
            // redirect
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
            throw new Error(ctx.error.message);
          },
        }
      );

      if (!data?.user) {
        throw new Error("No user data");
      }

      toast.success("Successfully Signed In", {
        description: "Now you can proceed further",
      });

      setEmailPassword({
        email: dataReturned.email,
        password: dataReturned.password,
      });
      setSignInForm(false);
      setSignUpForm(false);
    } catch (error) {
      toast.error("Error Signing In", {
        description: "There was an error when signing in",
      });
      console.log(error);
    }
  };

  return (
    <Dialog open={signInFormOpen} onOpenChange={setSignInForm}>
      <DialogContent className="max-w-[340px] lg:max-w-[460px]">
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex justify-center mb-4">
              <div className="text-2xl font-extrabold uppercase text-neutral-800">
                Ertys<span className="text-2xl text-blue-600">Events</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full bg-white rounded-lg p-2 pt-0 max-h-[400px] overflow-y-scroll">
          {/* Heading */}
          <div className="text-center mb-8 space-y-1">
            <h1 className="text-lg font-semibold text-foreground">
              Sign In to your Account
            </h1>
            <p className="text-neutral-600 text-sm">
              Get started with ErtysEvents today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground font-medium text-xs lg:text-sm"
              >
                Email
              </Label>
              <Input
                // id="email"
                // type="email"
                placeholder="team@zhanashyr.com"
                {...register("email")}
                className="h-10 border-dashed border-[#d4d4d4] text-sm"
                // required
              />
              {errors.email && (
                <p className="text-xs font-normal text-red-600 ">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mb-6">
              <Label
                htmlFor="password"
                className="text-foreground font-medium text-xs lg:text-sm"
              >
                Password
              </Label>
              <Input
                // id="password"
                type="password"
                placeholder="••••••••••••"
                className="h-10 text-sm border-dashed border-[#d4d4d4]"
                {...register("password")}
                // required
                // minLength={6}
              />
              {errors.password ? (
                <p className="text-xs font-normal text-red-600">
                  {errors.password.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Must be at least 6 characters long.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer h-11 bg-blue-500 hover:bg-blue-600/90 text-white font-medium rounded-md text-sm mt-4"
            >
              Sign In →
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="#"
              onClick={() => {
                setSignUpForm(true);
                setSignInForm(false);
              }}
              className="text-foreground font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
