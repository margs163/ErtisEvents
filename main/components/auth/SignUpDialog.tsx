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
import { UserSignUpSchema, UserSignUpType, UserType } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUserStore } from "@/lib/userStore";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { interestTags } from "@/lib/constants";

export default function SignUpDialog() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<UserSignUpType>({
    resolver: zodResolver(UserSignUpSchema),
  });

  const signUpFormOpen = useDialogsStore((state) => state.signUpFormOpen);
  const setSignUpForm = useDialogsStore((state) => state.setSignUpForm);
  const setSignInForm = useDialogsStore((state) => state.setSignInForm);
  const setUserData = useUserStore((state) => state.setUserData);
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const submit: SubmitHandler<UserSignUpType> = async (
    dataReturned: UserSignUpType
  ) => {
    console.log(dataReturned);
    if (interests.length < 1) {
      toast.error("No Interests Specified", {
        description: "Please specify your interests",
      });
      return;
    }
    try {
      const { email, name, password, age, gender, role } = dataReturned;
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/",
          age,
          gender,
          interests,
          role,
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

      const userData: UserType = {
        name: data.user.name,
        email: data.user.email,
        password: password,
        age: age,
        gender: gender,
        role: role,
        interests: interests,
        createdAt: data.user.createdAt,
        updatedAt: data.user.updatedAt,
        emailVerified: data.user.emailVerified,
      };

      toast.success("Successfully Signed Up", {
        description: "Now you need to log in",
      });

      console.log("Signed Up");

      setUserData(userData);
      setSignUpForm(false);
      setSignInForm(true);
    } catch (error) {
      toast.error("Error Signing Up", {
        description: "There was an error when signing up",
      });
      console.log(error);
    }
  };

  return (
    <Dialog open={signUpFormOpen} onOpenChange={setSignUpForm}>
      <DialogContent className="max-w-[340px] lg:max-w-[468px] pb-0 bg-white">
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex justify-center mb-4">
              <div className="text-2xl font-extrabold uppercase text-neutral-800">
                Ertys<span className="text-2xl text-blue-600">Events</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full bg-white rounded-lg p-2 pt-0 max-h-[400px] lg:max-h-[500px] overflow-y-scroll no-bar pb-0">
          {/* Heading */}
          <div className="text-center mb-8 space-y-1">
            <h1 className="text-lg lg:text-xl font-semibold text-foreground">
              Create an Account
            </h1>
            <p className="text-neutral-600 text-sm">
              Get started with ErtysEvents today.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 lg:space-y-5"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-foreground font-medium text-xs lg:text-sm"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                {...register("name")}
                className="h-10 border-dashed border-[#d4d4d4] text-sm"
                required
              />
              {errors.name && (
                <p className="text-xs font-normal text-red-600 ">
                  {errors.name.message}
                </p>
              )}
            </div>
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
                placeholder="team@mynaui.com"
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

            {/* Age */}
            <div className="space-y-2">
              <Label
                htmlFor="age"
                className="text-foreground font-medium text-xs lg:text-sm"
              >
                Age
              </Label>
              <Input
                // id="age"
                type="number"
                {...register("age", { valueAsNumber: true, min: 12 })}
                placeholder="Enter your age"
                className="h-10 border-dashed border-[#d4d4d4] text-sm"
                required
                // min="1"
                // max="120"
              />
              {errors.age && (
                <p className="text-xs font-normal text-red-600 ">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label
                htmlFor="gender"
                className="text-foreground font-medium text-xs lg:text-sm"
              >
                Gender
              </Label>
              <select
                id="gender"
                // name="gender"
                {...register("gender")}
                className="w-full h-10 px-3 text-sm rounded-md border-2 border-dashed border-[#d4d4d4] bg-white text-foreground font-medium focus:outline-none focus:border-blue-500 focus:ring-0"
                // required
                // onChange={(e) => setGender(e.target.value)}
              >
                <option value="" className="text-sm">
                  Select gender
                </option>
                <option value="male" className="text-sm">
                  Male
                </option>
                <option value="female" className="text-sm">
                  Female
                </option>
              </select>
              {errors.gender && (
                <p className="text-xs font-normal text-red-600 ">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="gender"
                className="text-foreground font-medium text-xs lg:text-sm"
              >
                Role
              </Label>
              <select
                id="role"
                // name="gender"
                {...register("role")}
                className="w-full h-10 px-3 text-sm rounded-md border-2 border-dashed border-[#d4d4d4] bg-white text-foreground font-medium focus:outline-none focus:border-blue-500 focus:ring-0"
                // required
                // onChange={(e) => setGender(e.target.value)}
              >
                <option value="" className="text-sm">
                  Select role
                </option>
                <option value="viewer" className="text-sm">
                  Viewer
                </option>
                <option value="organizer" className="text-sm">
                  Organizer
                </option>
              </select>
              {errors.role && (
                <p className="text-xs font-normal text-red-600 ">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Interest Tags */}
            <div className="space-y-2 my-5">
              <Label className="text-foreground font-medium text-xs lg:text-sm">
                Select Your Interests
              </Label>
              <div className="flex flex-wrap gap-2 p-4 border-2 border-dashed border-[#d4d4d4] rounded-md">
                {interestTags.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      interests.includes(interest)
                        ? "bg-blue-500 text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2 mb-6">
              <Label
                htmlFor="password"
                className="text-foreground font-medium text-xs lg:text-sm"
              >
                New Password
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

            <div className="space-y-2 flex items-center flex-col sticky bottom-0 bg-white p-4 pt-6">
              <button
                type="submit"
                className="w-full cursor-pointer h-11 bg-blue-500 hover:bg-blue-600/90 text-white font-medium rounded-md text-sm"
              >
                Create Account →
              </button>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="#"
                  onClick={() => {
                    setSignUpForm(false);
                    setSignInForm(true);
                  }}
                  className="text-foreground font-medium hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>

          {/* Footer */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
