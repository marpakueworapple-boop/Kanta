import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/hero-designer-edit.jpg";
import { Icon } from "./icons";

/** Hero — designer edit banner with a forest readability gradient and pager dots. */
export function HeroBanner() {
  return (
    <section aria-label="Featured" className="flex flex-col items-center gap-3">
      <div className="relative h-[210px] w-full overflow-hidden rounded-xl">
        <Image
          src={hero}
          alt="A woman in a tailored terracotta and green outfit by a Ghanaian designer"
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 480px) 100vw, 440px"
          className="object-cover object-[70%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,58,43,0.92) 0%, rgba(30,58,43,0.6) 45%, rgba(30,58,43,0) 78%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-5 pt-[22px]">
          <div className="flex max-w-[230px] flex-col gap-2">
            <p className="t-over text-gold">New season · Designers</p>
            <p className="t-hero text-on-brand">
              Made in Accra,
              <br />
              worn everywhere.
            </p>
            <p className="t-cap text-on-brand">Fresh drops from 40+ local labels</p>
          </div>
          <Link
            href="/explore?type=designer"
            className="t-label inline-flex w-fit items-center gap-1.5 rounded-full bg-cream py-[9px] pr-3.5 pl-4 text-forest"
          >
            Shop the edit
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-[18px] rounded-full bg-forest" />
        <span className="size-1.5 rounded-full bg-line" />
        <span className="size-1.5 rounded-full bg-line" />
      </div>
    </section>
  );
}
