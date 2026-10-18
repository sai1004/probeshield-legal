/**
 * The badge/title/date-meta block at the top of a legal page. Privacy Policy and Terms
 * of Service duplicated this markup identically, differing only in the text content.
 */
export function LegalPageHeader({
  badge,
  title,
  titleAccent,
  effectiveDate,
  lastUpdated,
  version,
}: {
  badge: string
  title: string
  titleAccent: string
  effectiveDate: string
  lastUpdated: string
  version: string
}) {
  return (
    <div className="page-header">
      <div className="page-badge">{badge}</div>
      <h1 className="page-title">{title} <span>{titleAccent}</span></h1>
      <div className="page-meta">
        <span className="page-meta-item">
          <strong>Effective Date:</strong> {effectiveDate}
        </span>
        <span className="page-meta-item">
          <strong>Last Updated:</strong> {lastUpdated}
        </span>
        <span className="page-meta-item">
          <strong>Version:</strong> {version}
        </span>
      </div>
    </div>
  )
}
