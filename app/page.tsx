import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WhyIndependent } from "@/components/sections/WhyIndependent";
import { ClientLedger } from "@/components/ClientLedger/ClientLedger";
import { Seasonal } from "@/components/sections/Seasonal";
import { Coverage } from "@/components/sections/Coverage";
import { Team } from "@/components/sections/Team";
import { GiveBack } from "@/components/sections/GiveBack";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ClientDesk } from "@/components/sections/ClientDesk";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { agencySchema, faqSchema, serviceSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Insurance Agency in Cockeysville MD | Kaifer Insurance Group" },
  description:
    "The Kaifer Insurance Group is a family owned independent insurance agency in Cockeysville, MD. Since 1974 we compare ten insurers for you. Get your quote today.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Insurance Agency in Cockeysville MD | Kaifer Insurance Group",
    description:
      "We don't work for an insurance company. We work for you. A family owned independent agency in Cockeysville, MD, since 1974.",
  },
  twitter: {
    title: "Insurance Agency in Cockeysville MD | Kaifer Insurance Group",
    description: "We don't work for an insurance company. We work for you. Family owned since 1974.",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[agencySchema(), faqSchema(), ...serviceSchemas()]} />
      <Hero />
      <WhyIndependent />
      <ClientLedger />
      <Seasonal />
      <Coverage />
      <Team />
      <GiveBack />
      <HowItWorks />
      <ClientDesk />
      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}
