// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import useDialogsStore from "@/lib/dialogsStore";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { UserSignUpSchema, UserSignUpType } from "@/lib/types";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useUserStore } from "@/lib/userStore";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";

// export default function SignUpDialog() {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isLoading, isSubmitting },
//   } = useForm<UserSignUpType>({
//     resolver: zodResolver(UserSignUpSchema),
//   });

//   const signUpFormOpen = useDialogsStore((state) => state.signUpFormOpen);
//   const setSignUpForm = useDialogsStore((state) => state.setSignUpForm);
//   const setUserData = useUserStore((state) => state.setUserData);
//   const [interests, setInterests] = useState([""]);

//   const toggleInterest = (interest: string) => {
//     setInterests((prev) =>
//       prev.includes(interest)
//         ? prev.filter((i) => i !== interest)
//         : [...prev, interest]
//     );
//   };

//   const submit: SubmitHandler<UserSignUpType> = async (
//     dataReturned: UserSignUpType
//   ) => {
//     if (interests.length < 1) {
//       toast.error("No Interests Specified", {
//         description: "Please specify your interests",
//       });
//       return;
//     }
//     try {
//       const { email, name, password, age, gender } = dataReturned;
//       const { data, error } = await authClient.signUp.email(
//         {
//           email,
//           password,
//           name,
//           callbackURL: "/dashboard",
//           age,
//           gender,
//           interests,
//         },
//         {
//           onRequest: (ctx) => {
//             setUserData({...dataReturned, interests: interests, emailVerified: data?.user.emailVerified, updatedAt: data?.user.createdAt, createdAt: data?.user.updatedAt});
//           },
//           onSuccess: (ctx) => {
//             //redirect to the dashboard or sign in page
//           },
//           onError: (ctx) => {
//             // display the error message
//             alert(ctx.error.message);
//           },
//         }
//       );

//       // setUserData();
//       router.replace("/login");
//     } catch (error) {
//       // toast.error("Invalid email", {
//       //   description: "User with this email already exists",
//       // });
//     }
//   };

//   return (
//     <Dialog open={signUpFormOpen} onOpenChange={setSignUpForm}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are you absolutely sure?</DialogTitle>
//           <DialogDescription>
//             This action cannot be undone. This will permanently delete your
//             account and remove your data from our servers.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="w-full max-w-[520px] bg-white rounded-lg border-2 border-dashed border-[#d4d4d4] p-8">
//           {/* Logo */}
//           <div className="flex justify-center mb-4">
//             <div className="text-2xl font-bold text-foreground">
//               <span className="text-3xl">⊃</span> MynaUI
//             </div>
//           </div>

//           {/* Heading */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-semibold text-foreground mb-2">
//               Create an Account
//             </h1>
//             <p className="text-muted-foreground">
//               Get started with MynaUI today.
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-foreground font-medium">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="team@mynaui.com"
//                 className="h-12 border-dashed border-[#d4d4d4]"
//                 required
//               />
//             </div>

//             {/* Age */}
//             <div className="space-y-2">
//               <Label htmlFor="age" className="text-foreground font-medium">
//                 Age
//               </Label>
//               <Input
//                 id="age"
//                 type="number"
//                 placeholder="Enter your age"
//                 className="h-12 border-dashed border-[#d4d4d4]"
//                 required
//                 min="1"
//                 max="120"
//               />
//             </div>

//             {/* Gender */}
//             <div className="space-y-2">
//               <Label htmlFor="gender" className="text-foreground font-medium">
//                 Gender
//               </Label>
//               <select
//                 id="gender"
//                 name="gender"
//                 className="w-full h-12 px-3 rounded-md border-2 border-dashed border-[#d4d4d4] bg-white text-foreground font-medium focus:outline-none focus:border-[#ff6b35] focus:ring-0"
//                 required
//                 onChange={(e) => setGender(e.target.value)}
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>

//             {/* Interest Tags */}
//             <div className="space-y-2">
//               <Label className="text-foreground font-medium">
//                 Select Your Interests
//               </Label>
//               <div className="flex flex-wrap gap-2 p-4 border-2 border-dashed border-[#d4d4d4] rounded-md">
//                 {interests.map((interest) => (
//                   <button
//                     key={interest}
//                     type="button"
//                     onClick={() => toggleInterest(interest)}
//                     className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
//                       interests.includes(interest)
//                         ? "bg-[#ff6b35] text-white"
//                         : "bg-muted text-foreground hover:bg-muted/80"
//                     }`}
//                   >
//                     {interest}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* New Password */}
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-foreground font-medium">
//                 New Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••••••"
//                 className="h-12 border-dashed border-[#d4d4d4]"
//                 required
//                 minLength={6}
//               />
//               <p className="text-sm text-muted-foreground">
//                 Must be at least 6 characters long.
//               </p>
//             </div>

//             {/* Confirm Password */}
//             <div className="space-y-2">
//               <Label
//                 htmlFor="confirm-password"
//                 className="text-foreground font-medium"
//               >
//                 Confirm Password
//               </Label>
//               <Input
//                 id="confirm-password"
//                 type="password"
//                 placeholder="••••••••••••"
//                 className="h-12 border-dashed border-[#d4d4d4]"
//                 required
//                 minLength={6}
//               />
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full h-12 bg-[#ff6b35] hover:bg-[#ff6b35]/90 text-white font-medium rounded-md"
//             >
//               Create Account →
//             </Button>
//           </form>

//           {/* Footer */}
//           <div className="mt-6 text-center text-muted-foreground">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="text-foreground font-medium hover:underline"
//             >
//               Login
//             </Link>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
