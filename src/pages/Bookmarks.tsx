import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { glossary, sections, form16Fields, headsOfIncome } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";

type ItemType = "glossary" | "section" | "form16" | "head";

interface ResolvedItem {
  id: string;
  label: string;
  subtitle: string;
  type: ItemType;
  path: string;
}

function resolveItem(id: string): ResolvedItem | null {
  const g = glossary.find((x) => x.id === id);
  if (g) return { id: g.id, label: g.term, subtitle: g.shortDef, type: "glossary", path: `/glossary/${g.id}` };

  const s = sections.find((x) => x.id === id);
  if (s) return { id: s.id, label: `Section ${s.sectionCode}`, subtitle: s.title, type: "section", path: `/deductions/${s.id}` };

  const f = form16Fields.find((x) => x.id === id);
  if (f) return { id: f.id, label: f.label, subtitle: f.partLabel, type: "form16", path: `/form16/${f.id}` };

  const h = headsOfIncome.find((x) => x.id === id);
  if (h) return { id: h.id, label: h.name, subtitle: "", type: "head", path: `/heads/${h.id}` };

  return null;
}

const TYPE_META: Record<ItemType, { label: string; color: string }> = {
  glossary: { label: "Glossary", color: "bg-purple-100 text-purple-700" },
  section: { label: "Section", color: "bg-teal/10 text-teal" },
  form16: { label: "Form 16", color: "bg-blue-100 text-blue-700" },
  head: { label: "Head of Income", color: "bg-amber-100 text-amber-700" },
};

function ItemCard({ item }: { item: ResolvedItem }) {
  const meta = TYPE_META[item.type];
  return (
    <Link
      to={item.path}
      className="block rounded-lg border border-gray-200 p-4 hover:border-teal/40 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900 group-hover:text-teal transition-colors truncate">
            {item.label}
          </h4>
          {item.subtitle && (
            <p className="text-sm text-gray-500 mt-0.5 truncate">{item.subtitle}</p>
          )}
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${meta.color}`}>
          {meta.label}
        </span>
      </div>
    </Link>
  );
}

function groupByType(items: ResolvedItem[]): Record<ItemType, ResolvedItem[]> {
  const grouped: Record<ItemType, ResolvedItem[]> = { glossary: [], section: [], form16: [], head: [] };
  for (const item of items) {
    grouped[item.type].push(item);
  }
  return grouped;
}

export default function Bookmarks() {
  const { bookmarks, recentlyViewed } = useApp();

  const resolvedBookmarks = bookmarks.map(resolveItem).filter(Boolean) as ResolvedItem[];
  const resolvedRecent = recentlyViewed.map(resolveItem).filter(Boolean) as ResolvedItem[];
  const groupedBookmarks = groupByType(resolvedBookmarks);

  return (
    <div>
      <PageHeader
        title="Bookmarks"
        subtitle="Your saved items and recently viewed content"
        breadcrumbs={[{ label: "Bookmarks" }]}
      />

      <div className="container-main py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-6">
              Saved Items
              {resolvedBookmarks.length > 0 && (
                <span className="ml-2 text-base font-normal text-gray-400">
                  ({resolvedBookmarks.length})
                </span>
              )}
            </h2>

            {resolvedBookmarks.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-400 text-lg mb-1">No bookmarks yet</p>
                <p className="text-sm text-gray-400">
                  Tap the bookmark icon on any glossary term, section, or Form 16 field to save it here.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {(Object.entries(groupedBookmarks) as [ItemType, ResolvedItem[]][])
                  .filter(([, items]) => items.length > 0)
                  .map(([type, items]) => (
                    <div key={type}>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {TYPE_META[type].label}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {items.map((item) => (
                          <ItemCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-6">
              Recently Viewed
              {resolvedRecent.length > 0 && (
                <span className="ml-2 text-base font-normal text-gray-400">
                  ({resolvedRecent.length})
                </span>
              )}
            </h2>

            {resolvedRecent.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-400 text-lg mb-1">No recent items</p>
                <p className="text-sm text-gray-400">
                  Items you view will appear here for quick access.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resolvedRecent.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
