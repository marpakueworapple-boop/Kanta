import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/hero-designer-edit.jpg";
import { Icon } from "./icons";

/**
  Hero — designer edit banner with a forest readability gradient and pager dots.
  Phones: 210px tall (as approved). Tablets: 340px. Laptops: 440px with larger type.
*/
export function HeroBanner() {
  return (
    <section aria-label="Featured" className="flex flex-col items-center gap-3">
      <div className="relative h-[210px] w-full overflow-hidden rounded-xl md:h-[340px] md:rounded-2xl lg:h-[440px]">
        <Image
          src={hero}
          alt="A woman in a tailored terracotta and green outfit by a Ghanaian designer"
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-[70%_center] md:object-[75%_22%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,58,43,0.92) 0%, rgba(30,58,43,0.6) 45%, rgba(30,58,43,0) 78%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-5 pt-[22px] md:p-10 lg:p-14">
          <div className="flex max-w-[230px] flex-col gap-2 md:max-w-[420px] md:gap-3 lg:max-w-[520px] lg:gap-4">
            <p className="t-over text-gold md:text-[11px]">New season · Designers</p>
            <p className="t-hero text-on-brand md:text-[36px] md:leading-[42px] lg:text-[48px] lg:leading-[54px]">
              Made in Accra,
              <br />
              worn everywhere.
            </p>
            <p className="t-cap text-on-brand md:text-sm md:leading-5">Fresh drops from 40+ local labels</p>
          </div>
          <Link
            href="/explore?type=designer"
            className="t-label inline-flex w-fit items-center gap-1.5 rounded-full bg-cream py-[9px] pr-3.5 pl-4 text-forest transition hover:bg-white md:py-3 md:pr-5 md:pl-6 md:text-sm"
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
