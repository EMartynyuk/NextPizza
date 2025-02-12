"use client";

import { cn } from "@/utils/utils";
import { Title } from ".";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface IInfoBlock {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock = ({ className, title, text, imageUrl }: IInfoBlock) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        className,
        "flex items-center justify-between w-[840px] gap-12"
      )}
    >
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex gap-5 mt-11">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <Button
            onClick={() => router.refresh()}
            variant="outline"
            className="text-gray-500 border-gray-400 hover:bg-gray-50"
          >
            Обновить
          </Button>
        </div>
      </div>

      <img src={imageUrl} alt={title} width={300} />
    </div>
  );
};
