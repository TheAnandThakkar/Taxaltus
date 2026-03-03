import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: Props) {
  return (
    <div className="bg-navy text-white py-10 sm:py-14">
      <div className="container-main">
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
            <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
            {breadcrumbs.map((bc, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {bc.path ? (
                  <Link to={bc.path} className="hover:text-white/80 transition-colors">{bc.label}</Link>
                ) : (
                  <span className="text-white/70">{bc.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-white/60 text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
