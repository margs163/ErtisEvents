import { BeatLoader } from "react-spinners";

export default function LoadingSmallUI() {
  return (
    <div className="mx-auto w-full flex-col items-center justify-center gap-2 font-geist flex py-6">
      <BeatLoader
        className="text-blue-500 scale-120 size-20 self-center text-center flex items-center justify-center"
        color="#4f39f6"
        aria-label="Loading"
        cssOverride={{
          marginInline: "auto",
          alignSelf: "center",
        }}
        loading
      />
      <div className="text-center gap-1">
        <h1 className="text-base font-semibold text-neutral-50">
          Loading resources...
        </h1>
        <p className="text-sm font-medium text-neutral-200">
          Please wait while the page is loading
        </p>
      </div>
    </div>
  );
}
