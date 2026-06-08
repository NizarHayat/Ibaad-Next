const items = [
  { label: 'Siding' },
  { label: 'Licensed & Insured', accent: true },
  { label: 'Pavers' },
  { label: 'Free Estimates', accent: true },
  { label: 'Roofing' },
  { label: 'Residential & Commercial', accent: true },
  { label: 'Painting' },
  { label: '929-944-9040', accent: true },
  { label: 'Masonry' },
  { label: 'Brick Repointing', accent: true },
  { label: 'Sidewalk' },
  { label: 'Powerwashing', accent: true },
  { label: 'Waterproofing' },
  { label: 'Brick Replacement', accent: true },
  { label: 'Concrete Replacement' },
  { label: 'Window Glass Replacement', accent: true },
]

// Duplicate for seamless loop
const allItems = [...items, ...items]

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="t-track">
        {allItems.map((item, i) => (
          <div className="t-item" key={i}>
            <span className="td" />
            {item.accent ? (
              <span className="tg">{item.label}</span>
            ) : (
              item.label
            )}
          </div>
        ))}
      </div>
    </div>
  )
}