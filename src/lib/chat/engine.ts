// Portfolio assistant engine.
// Deterministic and grounded: every answer is composed from src/content/profile.ts.
// Pipeline: normalise → detect entities (projects, technologies) → detect intent →
// compose an answer; otherwise fall back to BM25 retrieval over the profile; otherwise
// say the information is not specified. No external AI service is required.

import {
  person,
  experience,
  skills,
  services,
  education,
  projects,
  featuredProjects,
  experienceText,
  experienceTextCapitalized,
  formatMonth,
  type Project,
} from '../../content/profile.ts';

export type ChatContext = { project?: string; techs?: string[]; intent?: string };
export type ChatLink = { label: string; href: string; external?: boolean };
export type ChatReply = {
  text: string;
  suggestions: string[];
  links: ChatLink[];
  context: ChatContext;
  /** What the engine matched, for debugging and tests. */
  matched: string;
};

const WHATSAPP = `https://wa.me/${person.whatsappNumber}?text=${encodeURIComponent(person.whatsappGreeting)}`;
const CONTACT_LINKS: ChatLink[] = [
  { label: 'WhatsApp Salman', href: WHATSAPP, external: true },
  { label: 'Email', href: `mailto:${person.email}`, external: true },
];
const RESUME_LINK: ChatLink = { label: 'Download resume (PDF)', href: person.resumePath, external: true };

// ---------------------------------------------------------------- normalisation

export function normalize(input: string): string {
  return ` ${input
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\b(what|who|where|how|that|it)'s\b/g, '$1 is')
    .replace(/\b(\w+)n't\b/g, '$1 not')
    .replace(/[^a-z0-9+#.\s/-]/g, ' ')
    .replace(/(^|\s)[.-]+|[.-]+(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
}

const has = (q: string, phrase: string) => q.includes(` ${phrase} `);
const hasAny = (q: string, phrases: string[]) => phrases.some((p) => has(q, p));

// ---------------------------------------------------------------- technologies

type Tech = { name: string; aliases: string[]; note?: string };

// Technologies that appear in Salman's skills or project stacks.
const TECHS: Tech[] = [
  { name: 'React', aliases: ['react', 'reactjs', 'react.js'] },
  { name: 'Next.js', aliases: ['next', 'nextjs', 'next.js'] },
  { name: 'TypeScript', aliases: ['typescript', 'ts'] },
  { name: 'JavaScript', aliases: ['javascript', 'js', 'ecmascript'] },
  { name: 'Node.js', aliases: ['node', 'nodejs', 'node.js'] },
  { name: 'NestJS', aliases: ['nest', 'nestjs', 'nest.js'] },
  { name: 'Express.js', aliases: ['express', 'expressjs', 'express.js'] },
  { name: 'Redux', aliases: ['redux'] },
  { name: 'AngularJS', aliases: ['angularjs', 'angular'], note: 'AngularJS is listed in his skills; none of the projects in his portfolio name it as his main work.' },
  { name: 'Tailwind CSS', aliases: ['tailwind', 'tailwindcss', 'tailwind css'] },
  { name: 'Material UI', aliases: ['material ui', 'mui', 'material-ui'] },
  { name: 'Ant Design', aliases: ['ant design', 'antd'] },
  { name: 'Bootstrap', aliases: ['bootstrap'] },
  { name: 'Formik', aliases: ['formik'] },
  { name: 'Ruby on Rails', aliases: ['rails', 'ruby on rails', 'ror'] },
  { name: 'Ruby', aliases: ['ruby'] },
  { name: 'Python', aliases: ['python'], note: 'Python is listed in his skills; in his projects it shows up through FastAPI on Better Homes.' },
  { name: 'FastAPI', aliases: ['fastapi', 'fast api'] },
  { name: 'Django', aliases: ['django'], note: 'Django is listed in his skills; none of the projects in his portfolio use it.' },
  { name: 'MySQL', aliases: ['mysql'] },
  { name: 'PostgreSQL', aliases: ['postgres', 'postgresql', 'psql'] },
  { name: 'MongoDB', aliases: ['mongo', 'mongodb'] },
  { name: 'Firebase', aliases: ['firebase'] },
  { name: 'SQL', aliases: ['sql'] },
  { name: 'Vector database', aliases: ['vector db', 'vector database', 'vector databases', 'vector search', 'embeddings'] },
  { name: 'OpenAI API', aliases: ['openai', 'open ai', 'gpt', 'chatgpt', 'gpt-4'] },
  { name: 'Anthropic API', aliases: ['anthropic', 'claude'] },
  { name: 'Ollama', aliases: ['ollama', 'llama', 'open source llm', 'open-source llm', 'self hosted llm', 'self-hosted llm', 'local llm', 'local models'] },
  { name: 'RAG', aliases: ['rag', 'retrieval augmented generation', 'retrieval-augmented generation', 'retrieval augmented'] },
  { name: 'AWS', aliases: ['aws', 'amazon web services', 's3', 'aws s3'] },
  { name: 'Azure Service Bus', aliases: ['azure', 'service bus', 'azure service bus'] },
  { name: 'Oracle OHIP', aliases: ['oracle', 'ohip', 'oracle ohip', 'opera'] },
  { name: 'Oracle Gen1', aliases: ['gen1', 'gen 1', 'oracle gen1', 'simphony gen1'] },
  { name: 'Oracle Gen2', aliases: ['gen2', 'gen 2', 'oracle gen2', 'simphony gen2'] },
  { name: 'Infrasys', aliases: ['infrasys'] },
  { name: 'Omega', aliases: ['omega', 'omega pos'] },
  { name: 'Foodics', aliases: ['foodics'] },
  { name: 'Xero', aliases: ['xero', 'xero api'] },
  { name: 'Algolia', aliases: ['algolia'] },
  { name: 'Google Maps API', aliases: ['google maps', 'maps api'] },
  { name: 'Intercom', aliases: ['intercom'] },
  { name: 'Amplitude', aliases: ['amplitude'] },
  { name: 'Twilio', aliases: ['twilio'] },
  { name: 'Swagger', aliases: ['swagger', 'openapi'] },
  { name: 'Microservices', aliases: ['microservice', 'microservices'] },
  { name: 'REST APIs', aliases: ['rest', 'rest api', 'rest apis', 'restful'] },
  { name: 'Git', aliases: ['git', 'github', 'gitlab'] },
  { name: 'Jira', aliases: ['jira'] },
  { name: 'Postman', aliases: ['postman'] },
  { name: 'Java', aliases: ['java'], note: "Java appears in the Abu Dhabi Global Management backend; Salman's work there centered on the frontend services and integrations." },
  { name: '.NET Core', aliases: ['.net', 'dotnet', 'asp.net', '.net core', 'net core'], note: ".NET Core appears in the Abu Dhabi Global Management backend; Salman's work there centered on the frontend services and integrations." },
];

// Commonly asked technologies that are NOT in Salman's materials. Recognising them lets
// the assistant say "not listed" instead of guessing.
const UNLISTED = [
  'react native', 'docker', 'kubernetes', 'k8s', 'graphql', 'vue', 'vuejs', 'nuxt', 'svelte', 'flutter', 'swift', 'kotlin', 'golang',
  'rust', 'php', 'laravel', 'c#', 'c++', 'terraform', 'gcp', 'google cloud', 'jest', 'cypress', 'playwright', 'selenium',
  'ci/cd', 'cicd', 'jenkins', 'github actions', 'redis', 'kafka', 'rabbitmq', 'elasticsearch', 'langchain', 'llamaindex',
  'pinecone', 'tensorflow', 'pytorch', 'hugging face', 'huggingface', 'scikit-learn', 'pandas', 'figma', 'wordpress',
  'shopify', 'solidity', 'blockchain', 'web3', 'unity', 'sass', 'webflow', 'salesforce', 'power bi', 'tableau', 'spark',
  'lambda', 'serverless', 'nginx', 'linux', 'gemini', 'mistral', 'fine-tuning', 'fine tuning', 'stripe', 'prisma',
  'typeorm', 'sequelize', 'supabase', 'dynamodb', 'oracle database', 'mssql', 'sql server', 'electron', 'three.js',
];

const techProjectsCache = new Map<string, Project[]>();

function techMatchesString(t: Tech, value: string): boolean {
  const v = normalize(value);
  return t.aliases.some((a) => has(v, a)) || has(v, t.name.toLowerCase());
}

function projectsUsing(t: Tech): Project[] {
  if (!techProjectsCache.has(t.name)) {
    techProjectsCache.set(t.name, projects.filter((p) => p.tech.some((x) => techMatchesString(t, x))));
  }
  return techProjectsCache.get(t.name)!;
}

const inSkills = (t: Tech) => skills.some((g) => g.items.some((x) => techMatchesString(t, x)));

function detectTechs(q: string): { known: Tech[]; unlisted: string[] } {
  const known: Tech[] = [];
  for (const t of TECHS) {
    // "react native" should not also count as "react"
    if (t.name === 'React' && has(q, 'react native') && !q.replace(' react native ', ' ').includes(' react ')) continue;
    if (t.name === 'Ruby' && has(q, 'ruby on rails') && !q.replace(' ruby on rails ', ' ').includes(' ruby ')) continue;
    if (t.aliases.some((a) => has(q, a))) known.push(t);
  }
  // Generic words that are also aliases only count with a tech-question cue.
  const filtered = known.filter((t) => !(['Next.js', 'Express.js', 'REST APIs', 'Git'].includes(t.name) && !techCue(q) && known.length === 1));
  const unlisted = UNLISTED.filter((u) => has(q, u));
  return { known: filtered, unlisted };
}

const techCue = (q: string) =>
  hasAny(q, ['know', 'knows', 'use', 'used', 'uses', 'using', 'work with', 'worked with', 'experience', 'familiar', 'skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'proficient', 'expert', 'can he', 'does he', 'did he', 'has he']);

// ---------------------------------------------------------------- projects

function detectProject(q: string): Project | undefined {
  let best: { p: Project; len: number } | undefined;
  for (const p of projects) {
    const names = [p.name.toLowerCase(), p.slug.replace(/-/g, ' '), ...(p.aliases ?? [])];
    for (const n of names) {
      const nn = normalize(n).trim();
      if (nn.length > 1 && has(q, nn) && (!best || nn.length > best.len)) best = { p, len: nn.length };
    }
  }
  return best?.p;
}

const FOLLOW_UP = ['it', 'its', 'this', 'that', 'there', 'this project', 'that project', 'the project', 'more', 'tell me more', 'details', 'more details', 'go on', 'and'];

const FACETS: Record<string, string[]> = {
  tech: ['tech', 'stack', 'tech stack', 'technologies', 'technology', 'built with', 'tools', 'frameworks', 'language', 'languages'],
  role: ['role', 'his role', 'contribution', 'contributions', 'did he do', 'did he build', 'responsible', 'responsibilities', 'his part', 'work on'],
  features: ['features', 'feature', 'functionality', 'what does it do', 'capabilities', 'does it do'],
  link: ['link', 'url', 'website', 'site', 'live', 'demo', 'visit', 'see it'],
};

function detectFacet(q: string): keyof typeof FACETS | undefined {
  for (const [facet, words] of Object.entries(FACETS)) if (hasAny(q, words)) return facet as keyof typeof FACETS;
  return undefined;
}

// ---------------------------------------------------------------- intents

type Intent =
  | 'greeting' | 'thanks' | 'bye' | 'bot' | 'about' | 'experience' | 'years' | 'skills' | 'ai' | 'projects'
  | 'services' | 'education' | 'certifications' | 'contact' | 'whatsapp' | 'availability' | 'location'
  | 'resume' | 'rates' | 'personal' | 'solo' | 'industries' | 'frontend_backend' | 'leadership' | 'best'
  | 'hire' | 'languages_spoken';

const INTENTS: { id: Intent; words: string[] }[] = [
  { id: 'greeting', words: ['hi', 'hello', 'hey', 'salam', 'assalam', 'assalamualaikum', 'good morning', 'good evening', 'good afternoon', 'yo'] },
  { id: 'thanks', words: ['thanks', 'thank you', 'thx', 'appreciate', 'great', 'awesome', 'perfect', 'cool', 'nice'] },
  { id: 'bye', words: ['bye', 'goodbye', 'see you', 'later'] },
  { id: 'bot', words: ['are you ai', 'are you a bot', 'are you real', 'who are you', 'how do you work', 'what are you', 'chatgpt', 'are you human'] },
  { id: 'about', words: ['who is', 'about salman', 'about him', 'tell me about', 'introduce', 'introduction', 'summary', 'overview', 'background', 'profile', 'who is salman', 'bio'] },
  { id: 'experience', words: ['experience', 'work history', 'career', 'company', 'companies', 'employer', 'nextbridge', 'job', 'jobs', 'position', 'current role', 'title', 'promotion', 'promoted', 'senior', 'worked at', 'work at', 'works at'] },
  { id: 'years', words: ['how many years', 'years of experience', 'how long', 'how experienced', 'since when', 'years'] },
  { id: 'skills', words: ['skills', 'skill', 'skillset', 'tech stack', 'stack', 'technologies', 'technology', 'tools', 'frameworks', 'programming languages', 'good at', 'strengths', 'expertise', 'proficient'] },
  { id: 'ai', words: ['ai', 'artificial intelligence', 'llm', 'llms', 'machine learning', 'ml', 'genai', 'generative', 'chatbot', 'assistant', 'nl to sql', 'natural language to sql', 'text to sql', 'prompt', 'ai projects', 'ai experience'] },
  { id: 'projects', words: ['projects', 'project', 'portfolio', 'work samples', 'case studies', 'built', 'products', 'apps', 'applications', 'what has he built', 'examples'] },
  { id: 'services', words: ['services', 'service', 'offer', 'offers', 'help with', 'what can he do', 'can he help', 'freelance', 'freelancing', 'consult', 'consulting', 'build for me', 'work for'] },
  { id: 'education', words: ['education', 'degree', 'university', 'study', 'studied', 'graduate', 'graduated', 'fast', 'nuces', 'bscs', 'computer science', 'qualification', 'qualifications', 'college'] },
  { id: 'certifications', words: ['certification', 'certifications', 'certificate', 'certificates', 'certified', 'courses', 'course', 'award', 'awards'] },
  { id: 'contact', words: ['contact', 'reach', 'email', 'mail', 'phone', 'number', 'call', 'get in touch', 'linkedin', 'connect', 'message him', 'talk to him'] },
  { id: 'whatsapp', words: ['whatsapp', 'whats app', 'wa'] },
  { id: 'availability', words: ['available', 'availability', 'open to', 'open for', 'looking for', 'remote', 'onsite', 'on-site', 'hybrid', 'relocate', 'relocation', 'notice period', 'start date', 'when can he start', 'full time', 'full-time', 'part time', 'part-time', 'job change'] },
  { id: 'location', words: ['where', 'location', 'located', 'based', 'city', 'country', 'live', 'lives', 'from', 'timezone', 'time zone', 'pakistan', 'lahore'] },
  { id: 'resume', words: ['resume', 'cv', 'curriculum vitae', 'download'] },
  { id: 'rates', words: ['rate', 'rates', 'hourly', 'salary', 'price', 'pricing', 'cost', 'charge', 'charges', 'budget', 'fee', 'fees', 'expected salary', 'compensation'] },
  { id: 'personal', words: ['age', 'old', 'married', 'wife', 'family', 'religion', 'hobby', 'hobbies', 'birthday', 'born', 'girlfriend', 'kids', 'height'] },
  { id: 'solo', words: ['solo', 'alone', 'by himself', 'sole developer', 'single handedly', 'independently', 'own his own', 'on his own', 'end to end'] },
  { id: 'industries', words: ['industries', 'industry', 'domains', 'domain', 'sectors', 'sector', 'clients', 'kind of clients'] },
  { id: 'frontend_backend', words: ['frontend or backend', 'backend or frontend', 'front end', 'frontend', 'back end', 'backend', 'full stack', 'full-stack', 'fullstack'] },
  { id: 'leadership', words: ['lead', 'leader', 'leadership', 'manage a team', 'managed', 'team lead', 'mentor', 'mentoring', 'team size'] },
  { id: 'best', words: ['best project', 'favorite', 'favourite', 'proudest', 'most impressive', 'flagship', 'highlight', 'highlights', 'top projects', 'main projects', 'featured'] },
  { id: 'hire', words: ['hire', 'hiring', 'why should', 'why hire', 'good fit', 'recruit', 'interview'] },
  { id: 'languages_spoken', words: ['speak', 'english', 'urdu', 'spoken languages', 'communication'] },
];

const INTENT_PRIORITY: Intent[] = [
  'bot', 'whatsapp', 'resume', 'rates', 'personal', 'certifications', 'solo', 'leadership', 'best', 'hire', 'frontend_backend',
  'years', 'availability', 'education', 'industries', 'languages_spoken', 'contact', 'location', 'ai', 'services',
  'about', 'experience', 'skills', 'projects', 'greeting', 'thanks', 'bye',
];

function scoreIntents(q: string): Map<Intent, number> {
  const scores = new Map<Intent, number>();
  for (const { id, words } of INTENTS) {
    let s = 0;
    for (const w of words) if (has(q, w)) s += w.includes(' ') ? 2 : 1;
    if (s) scores.set(id, s);
  }
  return scores;
}

// ---------------------------------------------------------------- answer builders

const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
const projectLink = (p: Project): ChatLink => ({ label: `${p.name} case study`, href: `/projects/${p.slug}` });
const names = (ps: Project[]) => ps.map((p) => `**${p.name}**`).join(', ');
const roleLine = () => {
  const current = experience.roles[0];
  return `${current.title} at ${experience.company} (since ${formatMonth(current.start)})`;
};

function reply(text: string, matched: string, opts: Partial<Omit<ChatReply, 'text' | 'matched'>> = {}): ChatReply {
  return { text, matched, suggestions: opts.suggestions ?? [], links: opts.links ?? [], context: opts.context ?? {} };
}

function aboutAnswer(): ChatReply {
  return reply(
    `**${person.name}** is a ${person.titles.join(' · ')} based in ${person.location}. He has ${experienceText()} of experience and is currently ${roleLine()}.\n\n${person.summaryShort} His recent work includes ${names(featuredProjects.filter((p) => p.ai))}.`,
    'about',
    { suggestions: ['What AI work has he done?', 'Show me his projects', 'What is his tech stack?', 'How can I contact him?'], links: [RESUME_LINK] },
  );
}

function experienceAnswer(): ChatReply {
  const roles = experience.roles.map((r) => `${r.title}, ${formatMonth(r.start)} to ${formatMonth(r.end)}`);
  return reply(
    `Salman has **${experienceText()}** of experience as a software engineer. He is currently a **${experience.roles[0].title}** at **${experience.company}** (${experience.location}), where his roles have been:\n${list(roles)}\n\nWhat he does there:\n${list([...experience.highlights])}`,
    'experience',
    { suggestions: ['Which projects did he work on?', 'What AI work has he done?', 'Has he built anything solo?'], links: [RESUME_LINK] },
  );
}

function yearsAnswer(): ChatReply {
  return reply(
    `Salman has **${experienceText()}** of professional experience building production web applications. He has been a ${experience.roles[0].title} at ${experience.company} since ${formatMonth(experience.roles[0].start)}.`,
    'years',
    { suggestions: ['Show his career progression', 'What is his tech stack?'] },
  );
}

function skillsAnswer(): ChatReply {
  return reply(
    `Here is Salman's stack, grouped by area:\n${list(skills.map((g) => `**${g.name}:** ${g.items.join(', ')}`))}`,
    'skills',
    { suggestions: ['Does he know Next.js?', 'What AI work has he done?', 'Is he frontend or backend?'] },
  );
}

function aiAnswer(): ChatReply {
  const ai = projects.filter((p) => p.ai);
  return reply(
    `AI integration is Salman's specialty. He builds LLM features into real products rather than demos:\n${list([
      '**Natural-language-to-SQL with RAG.** AskBase AI turns plain-English questions into validated, read-only SQL, using a semantic layer and vector retrieval for business context.',
      '**Several model providers.** OpenAI and Anthropic APIs, plus self-hosted open-source models through Ollama.',
      '**An embeddable assistant.** Grace AI gives real-estate agents in Dubai instant answers about listings, as a standalone app and as a script embedded in other websites.',
      '**AI in existing platforms.** AI services for agents on Better Homes, and OpenAI and Anthropic features on the Ring N Bring hospitality platform.',
    ])}\n\nAI projects: ${names(ai)}.`,
    'ai',
    { suggestions: ['Tell me about AskBase AI', 'Tell me about Grace AI', 'Which LLMs has he used?'], links: ai.slice(0, 2).map(projectLink) },
  );
}

function projectsAnswer(): ChatReply {
  const featured = featuredProjects.map((p) => `**${p.name}**: ${p.tagline} (${p.role})`);
  const others = projects.filter((p) => !p.featured).map((p) => p.name);
  return reply(
    `Salman's featured work:\n${list(featured)}\n\nAlso: ${others.join(', ')}.\n\nAsk me about any of them for details.`,
    'projects',
    { suggestions: featuredProjects.slice(0, 3).map((p) => `Tell me about ${p.name}`) },
  );
}

function projectAnswer(p: Project, facet?: string): ChatReply {
  const context: ChatContext = { project: p.slug };
  const links: ChatLink[] = [projectLink(p)];
  const more = [`What tech did ${p.name} use?`, `What was his role on ${p.name}?`, 'Show me other projects'];

  if (facet === 'tech') {
    return reply(`**${p.name}** was built with ${p.tech.join(', ')}.`, `project:${p.slug}:tech`, { context, links, suggestions: [`What was his role on ${p.name}?`, `What does ${p.name} do?`] });
  }
  if (facet === 'role') {
    return reply(
      `On **${p.name}**, Salman worked as **${p.role}**:\n${list(p.contributions)}`,
      `project:${p.slug}:role`,
      { context, links, suggestions: [`What tech did ${p.name} use?`, `What does ${p.name} do?`] },
    );
  }
  if (facet === 'features') {
    return reply(`Key features of **${p.name}**:\n${list(p.features)}`, `project:${p.slug}:features`, { context, links, suggestions: more.slice(0, 2) });
  }
  if (facet === 'link') {
    return reply(
      `**${p.name}** is a client product, so I don't share links to it here. The case study covers what it does, the architecture and Salman's role.`,
      `project:${p.slug}:link`,
      { context, links, suggestions: more.slice(0, 2) },
    );
  }
  return reply(
    `**${p.name}**: ${p.tagline}.\n\n${p.overview}\n\n**His role:** ${p.role}\n${list(p.contributions.slice(0, 3))}\n\n**Tech:** ${p.tech.join(', ')}`,
    `project:${p.slug}`,
    { context, links, suggestions: more },
  );
}

function techAnswer(known: Tech[], unlisted: string[]): ChatReply {
  const parts: string[] = [];
  for (const t of known) {
    const used = projectsUsing(t);
    const skill = inSkills(t);
    if (t.note && (used.length === 0 || ['Java', '.NET Core'].includes(t.name))) {
      parts.push(`**${t.name}**: ${t.note}`);
    } else if (used.length) {
      parts.push(`**${t.name}**: yes. He has used it on ${names(used)}.`);
    } else if (skill) {
      parts.push(`**${t.name}**: yes, it is part of his listed skills.${t.note ? ` ${t.note}` : ''}`);
    }
  }
  for (const u of unlisted) {
    parts.push(`**${u.replace(/\b\w/g, (c) => c.toUpperCase())}**: not mentioned in Salman's portfolio, so I can't confirm it. You can ask him directly.`);
  }
  const anyUnlisted = unlisted.length > 0;
  return reply(parts.join('\n\n'), `tech:${[...known.map((t) => t.name), ...unlisted].join(',')}`, {
    context: { techs: known.map((t) => t.name) },
    suggestions: ['What is his full tech stack?', 'What AI work has he done?', 'Show me his projects'],
    links: anyUnlisted ? CONTACT_LINKS : [],
  });
}

// Questions about an area of the stack ("databases", "cloud", "frontend skills").
const SKILL_AREAS: { words: string[]; group: string }[] = [
  { words: ['database', 'databases', 'db', 'dbs', 'data layer', 'sql databases', 'nosql'], group: 'Data' },
  { words: ['cloud', 'devops', 'hosting', 'infrastructure', 'integrations', 'third party', 'third-party', 'apis he integrated'], group: 'Cloud & integrations' },
  { words: ['frontend skills', 'front end skills', 'ui', 'ui frameworks', 'css frameworks'], group: 'Frontend' },
  { words: ['backend skills', 'back end skills', 'server side', 'server-side'], group: 'Backend' },
];

function skillAreaAnswer(q: string): ChatReply | undefined {
  const area = SKILL_AREAS.find((a) => hasAny(q, a.words));
  if (!area) return undefined;
  const group = skills.find((g) => g.name === area.group);
  if (!group) return undefined;
  const examples = projects
    .filter((p) => p.tech.some((t) => group.items.some((i) => normalize(i).includes(normalize(t).trim()))))
    .slice(0, 5);
  return reply(
    `**${group.name}:** ${group.items.join(', ')}.${examples.length ? `\n\nUsed on ${names(examples)}.` : ''}`,
    `skill-area:${group.name}`,
    { suggestions: ['What is his full tech stack?', 'Show me his projects'], links: examples.slice(0, 2).map(projectLink) },
  );
}

function servicesAnswer(): ChatReply {
  const lines = services.map((s) => {
    const ev = s.evidence.map((slug) => projects.find((p) => p.slug === slug)?.name).filter(Boolean);
    return `**${s.title}.** ${s.body} _Examples: ${ev.join(', ')}._`;
  });
  return reply(
    `Salman can help with:\n${list(lines)}\n\nTo discuss a project, message him on WhatsApp or by email.`,
    'services',
    { suggestions: ['How can I contact him?', 'What AI work has he done?'], links: CONTACT_LINKS },
  );
}

function educationAnswer(): ChatReply {
  return reply(`Salman holds a **${education.degree}** from **${education.school}**.`, 'education', {
    suggestions: ['Does he have certifications?', 'What is his experience?'],
  });
}

function notSpecified(topic: string, matched: string, links: ChatLink[] = CONTACT_LINKS): ChatReply {
  return reply(
    `${topic} isn't specified in Salman's portfolio, so I don't want to guess. You can ask him directly on WhatsApp or by email.`,
    matched,
    { links, suggestions: ['What are his skills?', 'Show me his projects'] },
  );
}

function contactAnswer(): ChatReply {
  return reply(
    `You can reach Salman here:\n${list([
      `**WhatsApp / phone:** ${person.phoneDisplay}`,
      `**Email:** ${person.email}`,
      `**LinkedIn:** linkedin.com/in/${person.linkedinHandle}`,
    ])}\n\nWhatsApp is the fastest way to get a reply.`,
    'contact',
    { links: [...CONTACT_LINKS, { label: 'LinkedIn', href: person.linkedin, external: true }], suggestions: ['What services does he offer?', 'Can I download his resume?'] },
  );
}

function whatsappAnswer(): ChatReply {
  return reply(
    `Salman's WhatsApp number is **${person.phoneDisplay}**. The button below opens a chat with a short greeting already filled in.`,
    'whatsapp',
    { links: [CONTACT_LINKS[0]], suggestions: ['What services does he offer?'] },
  );
}

function availabilityAnswer(): ChatReply {
  return reply(
    `Availability, start dates and engagement details aren't listed in Salman's portfolio. The quickest way to ask is WhatsApp or email.`,
    'availability',
    { links: CONTACT_LINKS, suggestions: ['What services does he offer?', 'Where is he based?'] },
  );
}

function locationAnswer(): ChatReply {
  return reply(`Salman is based in **${person.location}**.`, 'location', {
    suggestions: ['How can I contact him?', 'What is his experience?'],
  });
}

function resumeAnswer(): ChatReply {
  return reply(`You can download Salman's latest resume as a PDF using the button below.`, 'resume', {
    links: [RESUME_LINK],
    suggestions: ['Summarize his experience', 'What are his skills?'],
  });
}

function soloAnswer(): ChatReply {
  const solo = projects.filter((p) => p.solo);
  return reply(
    `Yes. Salman was the sole developer on:\n${list(solo.map((p) => `**${p.name}**: ${p.contributions[0]}`))}\n\nOn larger client platforms he works within project teams.`,
    'solo',
    { links: solo.map(projectLink), suggestions: ['Tell me about Grace AI', 'What AI work has he done?'] },
  );
}

function industriesAnswer(): ChatReply {
  return reply(`Salman has delivered work across ${person.industries.join(', ').toLowerCase()}.`, 'industries', {
    suggestions: ['Show me his projects', 'What AI work has he done?'],
  });
}

function frontendBackendAnswer(): ChatReply {
  return reply(
    `Both. Salman is a **Full Stack Developer** and works across the whole stack. For example:\n${list([
      '**Backend:** NestJS services integrating Ring N Bring with POS and PMS systems (Oracle OHIP, Oracle Gen1 and Gen2, Infrasys, Omega, Foodics).',
      '**Frontend:** React and Redux services for Abu Dhabi Global Management, and Next.js rendering on Better Homes.',
      '**End to end:** AskBase AI, Grace AI and the APC CRM revamp.',
    ])}`,
    'frontend_backend',
    { suggestions: ['What is his tech stack?', 'Tell me about Ring N Bring'] },
  );
}

function leadershipAnswer(): ChatReply {
  return reply(
    `His portfolio doesn't list formal team-lead or people-management roles. It does show ownership: he was the **sole developer** on Grace AI, and he **led the rollout** of the Grace AI script across multiple Better Homes websites. For anything beyond that, ask him directly.`,
    'leadership',
    { links: CONTACT_LINKS, suggestions: ['Tell me about Grace AI', 'What is his experience?'] },
  );
}

function bestAnswer(): ChatReply {
  const top = featuredProjects.slice(0, 4).map((p) => `**${p.name}**: ${p.tagline}`);
  return reply(`These are the projects Salman features first:\n${list(top)}`, 'best', {
    suggestions: top.slice(0, 2).map((_, i) => `Tell me about ${featuredProjects[i].name}`),
    links: featuredProjects.slice(0, 2).map(projectLink),
  });
}

function hireAnswer(): ChatReply {
  return reply(
    `In short:\n${list([
      `**${experienceTextCapitalized()}** building production web applications; currently ${experience.roles[0].title} at ${experience.company}.`,
      '**Full stack.** React and Next.js interfaces, Node.js services with Express.js and NestJS, MySQL, PostgreSQL and MongoDB.',
      '**AI integration.** Natural-language-to-SQL, RAG, OpenAI, Anthropic and self-hosted LLMs, with the safety checks needed for real data.',
      '**Integrations.** Hospitality POS and PMS systems (Oracle OHIP, Oracle Gen1 and Gen2, Infrasys, Omega, Foodics), Xero accounting, AWS S3 and Algolia.',
      '**Ownership.** Built Grace AI end to end as the sole developer.',
    ])}`,
    'hire',
    { links: [...CONTACT_LINKS, RESUME_LINK], suggestions: ['Show me his projects', 'How can I contact him?'] },
  );
}

function botAnswer(): ChatReply {
  return reply(
    `I'm Salman's portfolio assistant. I don't use a generative AI model. I match your question against the information in his portfolio and answer only from that, so I won't make things up. If something isn't in his portfolio, I'll say so.`,
    'bot',
    { suggestions: ['Who is Salman?', 'What AI work has he done?'] },
  );
}

function greetingAnswer(): ChatReply {
  return reply(
    `Hi! I can answer questions about Salman: his experience, skills, AI work, projects and how to reach him. What would you like to know?`,
    'greeting',
    { suggestions: ['Who is Salman?', 'What AI work has he done?', 'Show me his projects', 'How can I contact him?'] },
  );
}

// ---------------------------------------------------------------- retrieval fallback (BM25)

type Doc = { text: string; project?: Project; tokens: string[] };
const STOP = new Set('a an the and or of to in on for with is are was were be been his he him what which who how does did do can could would i you me my it its this that at by from as about tell show any some there their them they has have had'.split(' '));
const tokenize = (s: string) => normalize(s).trim().split(' ').filter((w) => w.length > 1 && !STOP.has(w));

const DOCS: Doc[] = (() => {
  const docs: { text: string; project?: Project }[] = [
    { text: person.summary },
    ...experience.highlights.map((h) => ({ text: h })),
    ...services.map((s) => ({ text: `${s.title}. ${s.body}` })),
    ...projects.flatMap((p) => [
      { text: `${p.name}: ${p.overview}`, project: p },
      ...p.features.map((f) => ({ text: `${p.name} feature: ${f}.`, project: p })),
      ...p.contributions.map((c) => ({ text: `On ${p.name}: ${c}`, project: p })),
    ]),
  ];
  return docs.map((d) => ({ ...d, tokens: tokenize(d.text) }));
})();
const AVG_LEN = DOCS.reduce((s, d) => s + d.tokens.length, 0) / DOCS.length;
const DF = (() => {
  const df = new Map<string, number>();
  for (const d of DOCS) for (const t of new Set(d.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  return df;
})();

function bm25(query: string): { doc: Doc; score: number }[] {
  const qt = [...new Set(tokenize(query))];
  const N = DOCS.length, k1 = 1.4, b = 0.75;
  return DOCS.map((doc) => {
    let score = 0;
    for (const t of qt) {
      const tf = doc.tokens.filter((x) => x === t).length;
      if (!tf) continue;
      const idf = Math.log(1 + (N - (DF.get(t) ?? 0) + 0.5) / ((DF.get(t) ?? 0) + 0.5));
      score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * doc.tokens.length) / AVG_LEN)));
    }
    return { doc, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------- main entry

export function answer(rawQuery: string, context: ChatContext = {}): ChatReply {
  const q = normalize(rawQuery);
  if (!q.trim()) return greetingAnswer();

  const project = detectProject(q);
  const { known, unlisted } = detectTechs(q);
  const facet = detectFacet(q);
  const intents = scoreIntents(q);
  // Ties go to the more specific intent (generic ones like "projects" are listed last).
  const rank = (i: Intent) => INTENT_PRIORITY.indexOf(i);
  const top = [...intents.entries()].sort((a, b) => b[1] - a[1] || rank(a[0]) - rank(b[0]))[0]?.[0];
  const wordCount = q.trim().split(' ').length;

  // Short social messages
  if (wordCount <= 4 && intents.has('thanks') && !project) {
    return reply("You're welcome! Anything else you'd like to know about Salman?", 'thanks', { context, suggestions: ['How can I contact him?', 'Show me his projects'] });
  }
  if (wordCount <= 3 && intents.has('bye')) return reply('Thanks for stopping by! Salman is one message away on WhatsApp.', 'bye', { links: [CONTACT_LINKS[0]] });
  if (intents.has('bot')) return botAnswer();

  // Explicit project mention wins
  if (project) return projectAnswer(project, facet);

  // Personal / compensation questions are deliberately not answered
  if (intents.has('personal') && !intents.has('experience')) return notSpecified('Personal information', 'personal');
  if (intents.has('rates')) return notSpecified('Rates and salary expectations', 'rates');
  if (intents.has('certifications')) {
    return reply(`No certifications are listed in Salman's portfolio. His formal qualification is a **${education.degree}** from ${education.school}.`, 'certifications', {
      links: CONTACT_LINKS,
      suggestions: ['What is his experience?', 'What are his skills?'],
    });
  }

  // Technology questions ("does he know X", "has he used Y")
  if ((known.length || unlisted.length) && (techCue(q) || wordCount <= 3 || unlisted.length) && !(intents.has('ai') && known.length === 0 && !unlisted.length)) {
    const generalAi = top === 'ai' && known.every((t) => ['OpenAI API', 'Anthropic API', 'Ollama', 'RAG', 'Vector database'].includes(t.name)) && !techCue(q) && !unlisted.length;
    if (!generalAi) return techAnswer(known, unlisted);
  }

  // Follow-up about the project in context ("what stack did it use?", "tell me more")
  const generalTopic = ['skills', 'experience', 'contact', 'services', 'education', 'resume', 'ai', 'projects', 'about'].includes(top ?? '');
  // "it/there/this project" clearly point back; bare "this"/"that" only when no general topic is asked.
  const pointsBack =
    hasAny(q, ['it', 'its', 'there', 'this project', 'that project', 'the project', 'tell me more', 'more details']) ||
    (!generalTopic && hasAny(q, ['this', 'that']));
  if (context.project && (pointsBack || (facet && !generalTopic) || (wordCount <= 2 && hasAny(q, FOLLOW_UP)))) {
    const p = projects.find((x) => x.slug === context.project);
    if (p) return projectAnswer(p, facet);
  }

  const area = skillAreaAnswer(q);
  if (area && !['contact', 'whatsapp', 'resume'].includes(top ?? '')) return area;

  switch (top) {
    case 'greeting':
      if (wordCount <= 4) return greetingAnswer();
      break;
    case 'whatsapp': return whatsappAnswer();
    case 'resume': return resumeAnswer();
    case 'contact': return intents.has('whatsapp') ? whatsappAnswer() : contactAnswer();
    case 'availability': return availabilityAnswer();
    case 'hire': return hireAnswer();
    case 'solo': return soloAnswer();
    case 'leadership': return leadershipAnswer();
    case 'best': return bestAnswer();
    case 'frontend_backend': return frontendBackendAnswer();
    case 'industries': return industriesAnswer();
    case 'education': return educationAnswer();
    case 'years': return yearsAnswer();
    case 'ai': return aiAnswer();
    case 'services': return servicesAnswer();
    case 'skills': return skillsAnswer();
    case 'projects': return projectsAnswer();
    case 'experience': return experienceAnswer();
    case 'location': return locationAnswer();
    case 'about': return aboutAnswer();
    case 'languages_spoken': return notSpecified('Spoken languages', 'languages_spoken');
  }
  if (intents.has('about') || has(q, 'salman')) return aboutAnswer();

  // Retrieval fallback
  const hits = bm25(rawQuery);
  if (hits.length && hits[0].score > 2.2) {
    const best = hits.slice(0, 2).filter((h, i) => i === 0 || h.score > hits[0].score * 0.8);
    const p = best[0].doc.project;
    return reply(
      `Here's what I found in Salman's portfolio:\n${list(best.map((h) => h.doc.text))}`,
      `retrieval:${best.map((h) => h.score.toFixed(1)).join(',')}`,
      {
        context: p ? { project: p.slug } : context,
        links: p ? [projectLink(p)] : [],
        suggestions: p ? [`Tell me more about ${p.name}`, 'Show me other projects'] : ['Show me his projects', 'What are his skills?'],
      },
    );
  }

  return reply(
    `I couldn't find that in Salman's portfolio, so I won't guess. I can tell you about his experience, skills, AI work, projects, services or how to contact him, or you can ask him directly.`,
    'unknown',
    { context, links: CONTACT_LINKS, suggestions: ['Who is Salman?', 'What AI work has he done?', 'Show me his projects', 'How can I contact him?'] },
  );
}

export const STARTER_QUESTIONS = ['Who is Salman?', 'What AI work has he done?', 'Show me his projects', 'How can I contact him?'];
