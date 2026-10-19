import Link from 'next/link';
import { Section } from './Section';

const POINTS = [
  {
    title: 'Answers grounded in the data',
    body: 'On AskBase AI, a semantic layer describes the client’s business and vector retrieval supplies the context the model needs before it writes any SQL.',
    project: { slug: 'askbase-ai', name: 'AskBase AI' },
  },
  {
    title: 'Guardrails for real data',
    body: 'Generated queries are validated and run read-only, inside multi-tenant isolation with workspace-level access control. Results are cached.',
    project: { slug: 'askbase-ai', name: 'AskBase AI' },
  },
  {
    title: 'Model choice per product',
    body: 'I have integrated the OpenAI and Anthropic APIs and self-hosted open-source models through Ollama, depending on what the product needs.',
    project: { slug: 'ring-n-bring', name: 'Ring N Bring' },
  },
];

export function AiWork() {
  return (
    <Section id="ai" num="02" title="AI integration" note="How I approach LLM features in production.">
      <p className="lead">
        I add LLM features to products that already have users and real data: a natural-language analytics product, an assistant real-estate agents use every day, and AI features on a hospitality platform. Most of the engineering goes into what surrounds the model: giving it the right context, checking its output and controlling what it can access.
      </p>
      <div className="points">
        {POINTS.map((p, i) => (
          <div className="point" key={p.title}>
            <p className="point__num">{String(i + 1).padStart(2, '0')}</p>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <small>See <Link className="text-link" href={`/projects/${p.project.slug}`}>{p.project.name}</Link></small>
          </div>
        ))}
      </div>
    </Section>
  );
}
