import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/services-data";
import { ServicePageContent } from "@/components/service/service-page-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} | LX Digital Corp`,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return <ServicePageContent service={service} />;
}
