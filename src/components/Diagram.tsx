import type { Diagram as DiagramData, Layer } from '@/content/profile';

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" role="list">
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

function LayerCard({ layer }: { layer: Layer }) {
  return (
    <li className={`layer${layer.mine ? ' layer--mine' : ''}`}>
      <div className="layer__head">
        <span className="layer__title">{layer.title}</span>
        {layer.mine && <span className="layer__badge">My work</span>}
      </div>
      {layer.items && <Tags items={layer.items} />}
      {layer.groups?.map((g) => (
        <div className="layer__group" key={g.label}>
          <span className="layer__label">{g.label}</span>
          <Tags items={g.items} />
        </div>
      ))}
    </li>
  );
}

/**
 * Architecture view of a project, drawn from confirmed facts in profile.ts.
 * Layers read top to bottom in narrow containers and left to right in wide ones
 * (container queries), and the layer Salman built is highlighted.
 */
export function Diagram({ data, large = false, label }: { data: DiagramData; large?: boolean; label: string }) {
  return (
    <figure className={`arch${large ? ' arch--large' : ''}`} aria-label={`${label}: ${data.caption}`}>
      <figcaption className="arch__caption">{data.caption}</figcaption>
      {data.kind === 'layers' ? (
        <ol className="arch__layers" role="list">
          {data.layers.map((layer) => <LayerCard key={layer.title} layer={layer} />)}
        </ol>
      ) : (
        <ul className="arch__modules" role="list">
          {data.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
    </figure>
  );
}
