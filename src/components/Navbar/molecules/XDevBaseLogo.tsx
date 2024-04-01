import Image from "next/image";

export const XDevBaseLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <Image src="/logo.png" alt="Icon" width={30} height={30} />
      <span className="text-xl font-semibold">XDevBase</span>
    </div>
  );
};
