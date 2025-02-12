import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-4">
      <Image src="/logo.png" alt="Logo" width={35} height={35} />
      <div>
        <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
        <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
      </div>
    </Link>
  );
};
