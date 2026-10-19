import { Fragment } from 'react';

/** Renders the assistant's tiny markdown subset (**bold**, _italic_, "- " lists) without HTML injection. */
function inline(text: string, key: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={`${key}-${i}`}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('_') && part.endsWith('_') && part.length > 2) return <em key={`${key}-${i}`}>{part.slice(1, -1)}</em>;
    return <Fragment key={`${key}-${i}`}>{part}</Fragment>;
  });
}

export function RichText({ text }: { text: string }) {
  const blocks: { type: 'p' | 'ul'; lines: string[] }[] = [];
  for (const line of text.split('\n')) {
    if (!line.trim()) { blocks.push({ type: 'p', lines: [] }); continue; }
    const isItem = line.startsWith('- ');
    const last = blocks[blocks.length - 1];
    if (isItem) {
      if (last?.type === 'ul') last.lines.push(line.slice(2));
      else blocks.push({ type: 'ul', lines: [line.slice(2)] });
    } else if (last?.type === 'p' && last.lines.length) last.lines.push(line);
    else blocks.push({ type: 'p', lines: [line] });
  }
  return (
    <>
      {blocks.filter((b) => b.lines.length).map((b, i) =>
        b.type === 'ul' ? (
          <ul key={i}>{b.lines.map((l, j) => <li key={j}>{inline(l, `${i}-${j}`)}</li>)}</ul>
        ) : (
          <p key={i}>{inline(b.lines.join(' '), String(i))}</p>
        ),
      )}
    </>
  );
}
