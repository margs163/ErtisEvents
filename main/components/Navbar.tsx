"use client";
import { authClient } from "@/lib/auth-client";
import useDialogsStore from "@/lib/dialogsStore";
import { useUserStore } from "@/lib/userStore";
import { cn } from "@/lib/utils";
import { Menu, TextAlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const setSignUpForm = useDialogsStore((state) => state.setSignUpForm);
  const setSignInForm = useDialogsStore((state) => state.setSignInForm);
  const userData = useUserStore((state) => state);
  const router = useRouter();

  const [pressed, setPressed] = useState(false);
  return (
    <nav className="w-full bg-black font-geist lg:sticky lg:top-0 lg:z-50">
      <div className="w-full flex items-center justify-between px-6 pr-4 py-3 lg:py-4 lg:px-20">
        <Link
          className="flex flex-row select-none items-center gap-2"
          href={"/"}
        >
          <Image
            src={"/logowhite.png"}
            alt="logo"
            className="size-20"
            width={120}
            height={120}
          />
          <h2 className="font-bold text-2xl lg:text-3xl text-blue-500 text-pretty flex flex-col items-start leading-none scale-x-110">
            ERTIS<span className="text-white">EVENTS</span>
          </h2>
          {/* <p className="text-xs font-medium text-neutral-600 self-start pl-2">
            Learn DSA
          </p> */}
        </Link>
        <ul className="text-sm lg:text-base lg:font-semibold font-medium text-white overflow-hidden w-full lg:flex flex-row justify-end gap-6 items-center hidden">
          <Link
            className="px-4 py-2 transition-colors rounded-2xl hover:bg-neutral-800 active:bg-neutral-800"
            href={"/"}
          >
            Дом
          </Link>
          <Link
            className="px-4 py-2 transition-colors rounded-2xl hover:bg-neutral-800 active:bg-neutral-800"
            href={"/search"}
            onClick={() => !userData?.email && setSignUpForm(true)}
          >
            События 2025
          </Link>
          <Link
            className="px-4 py-2 transition-colors rounded-2xl hover:bg-neutral-800 active:bg-neutral-800"
            href={"#"}
            onClick={() => setSignInForm(true)}
          >
            Войти
          </Link>
          <Link
            className="px-4 py-2 transition-colors rounded-2xl hover:bg-neutral-800 active:bg-neutral-800"
            href={"#"}
            onClick={() => setSignUpForm(true)}
          >
            Создать Аккаунт
          </Link>
          {userData?.email && (
            <button
              className="px-4 py-2 transition-colors rounded-2xl hover:bg-neutral-800 active:bg-neutral-800"
              onClick={async () => {
                await authClient.signOut();
                router.refresh();
              }}
            >
              Выйти
            </button>
          )}
          <Link
            className="px-4 py-2 transition-colors rounded-2xl text-white hover:text-gray-700 hover:bg-white active:bg-white border-[1.5px] border-gray-200"
            href={"/"}
            onClick={() => !userData?.email && setSignUpForm(true)}
          >
            Стать Организатором
          </Link>
        </ul>
        <div
          className="flex items-center justify-center p-2.5 rounded-full hover:bg-neutral-900 active:bg-neutral-900 tansition-colors lg:hidden"
          onClick={() => setPressed((prev) => !prev)}
        >
          {pressed ? (
            <X className="size-5.5 text-neutral-100 hover:text-neutral-50 active:text-neutral-50 transition-colors" />
          ) : (
            <TextAlignJustify className="size-5.5 text-neutral-100 hover:text-neutral-50 active:text-neutral-50 transition-colors" />
          )}
        </div>
      </div>
      <div
        className={cn(
          "grid transition-[grid-template-rows] ease-in-out duration-300 w-full px-2 lg:hidden",
          pressed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <ul className="text-sm font-medium text-white  overflow-hidden w-full flex flex-col mb-5">
          <Link
            className="px-5 py-2.5 hover:bg-neutral-900 transition-colors hover:text-blue-500 active:text-blue-500 w-full"
            href={"/"}
          >
            Дом
          </Link>
          <Link
            className="px-5 py-2.5 hover:bg-neutral-900 transition-colors hover:text-blue-500 active:text-blue-500 w-full"
            href={"/search"}
            onClick={() => !userData?.email && setSignUpForm(true)}
          >
            События 2025
          </Link>
          <Link
            className="px-5 py-2.5 hover:bg-neutral-900 transition-colors hover:text-blue-500 active:text-blue-500 w-full"
            href={"#"}
            onClick={() => setSignUpForm(true)}
          >
            Стать Организатором
          </Link>
          <Link
            className="px-5 py-2.5 hover:bg-neutral-900 transition-colors hover:text-blue-500 active:text-blue-500 w-full"
            href={"#"}
            onClick={() => setSignInForm(true)}
          >
            Войти
          </Link>
          <Link
            className="px-5 py-2.5 hover:bg-neutral-900 transition-colors hover:text-blue-500 active:text-blue-500 w-full"
            href={"#"}
            onClick={() => setSignUpForm(true)}
          >
            Создать Аккаунт
          </Link>
          {userData?.email && (
            <button
              className="px-5 py-2.5 hover:bg-neutral-900 transition-colors hover:text-blue-500 active:text-blue-500 w-full text-left"
              onClick={async () => {
                await authClient.signOut();
                router.refresh();
              }}
            >
              Выйти
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
