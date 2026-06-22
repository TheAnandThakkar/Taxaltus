// Emits a JSON-LD <script> for page-level structured data (FAQ, Article,
// BreadcrumbList, SoftwareApplication, etc.). Server component — render it
// anywhere in a page/layout to add rich-result markup for that route.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
