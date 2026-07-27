import type { ServiceSlug } from "@/lib/services-data";
import { ServicePageClient } from "@/components/service/service-page-client";

type ServicePageContentProps = {
  slug: ServiceSlug;
};

export function ServicePageContent({ slug }: ServicePageContentProps) {
  return <ServicePageClient slug={slug} />;
}
