import Image from "next/image";
import Icon from "@/assets/icon.png"

export const XDevBaseLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <Image src={Icon} alt="Icon" height={30} />
      <span className="text-xl font-semibold">XDevBase</span>
    </div>
  );
};
