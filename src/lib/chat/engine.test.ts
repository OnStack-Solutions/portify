import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answer } from './engine.ts';

const m = (q: string, ctx = {}) => answer(q, ctx).matched;

test('greets and introduces', () => {
  assert.equal(m('hi'), 'greeting');
  assert.equal(m('Who is Salman?'), 'about');
  assert.equal(m('tell me about him'), 'about');
});

test('answers core profile topics', () => {
  assert.equal(m('What is his work experience?'), 'experience');
  assert.equal(m('how many years of experience does he have'), 'years');
  assert.equal(m('What is his tech stack?'), 'skills');
  assert.equal(m('What AI work has he done?'), 'ai');
  assert.equal(m('Show me his projects'), 'projects');
  assert.equal(m('What services does he offer?'), 'services');
  assert.equal(m('Where did he study?'), 'education');
  assert.equal(m('How can I contact him?'), 'contact');
  assert.equal(m('whatsapp number?'), 'whatsapp');
  assert.equal(m('Is he available for remote work?'), 'availability');
  assert.equal(m('Where is he based?'), 'location');
  assert.equal(m('Can I download his CV?'), 'resume');
  assert.equal(m('Has he built anything solo?'), 'solo');
  assert.equal(m('Is he frontend or backend?'), 'frontend_backend');
  assert.equal(m('why should we hire him'), 'hire');
});

test('recognises projects by name and alias', () => {
  assert.equal(m('Tell me about AskBase AI'), 'project:askbase-ai');
  assert.equal(m('what is grace'), 'project:grace-ai');
  assert.equal(m('What did he do on ADGM?'), 'project:abu-dhabi-global-management:role');
  assert.equal(m('apc crm tech stack'), 'project:apc-crm:tech');
  assert.equal(m('ringnbring link'), 'project:ring-n-bring:link');
});

test('keeps project context for follow-ups', () => {
  const first = answer('Tell me about Ring N Bring');
  assert.equal(first.context.project, 'ring-n-bring');
  assert.equal(m('what stack did it use?', first.context), 'project:ring-n-bring:tech');
  assert.equal(m('what was his role there', first.context), 'project:ring-n-bring:role');
  // A general question must not be hijacked by the previous project.
  assert.equal(m('What are his skills?', first.context), 'skills');
  assert.equal(m('Show me projects that use AI', first.context), 'ai');
  assert.equal(m('tell me more', first.context), 'project:ring-n-bring');
});

test('knows the hospitality POS and PMS integrations', () => {
  for (const pos of ['Infrasys', 'Omega', 'Foodics', 'Oracle Gen2']) {
    assert.match(answer(`Has he worked with ${pos}?`).text, /Ring N Bring/, pos);
  }
});

test('technology questions are grounded', () => {
  const r = answer('Does he know Next.js?');
  assert.match(r.matched, /^tech:Next\.js/);
  assert.match(r.text, /AskBase AI/);
  const x = answer('Has he used Xero?');
  assert.match(x.text, /APC CRM/);
});

test('never claims unlisted technologies', () => {
  const r = answer('Does he know Docker and Kubernetes?');
  assert.match(r.text, /Docker\*\*: not mentioned/);
  assert.match(r.text, /Kubernetes\*\*: not mentioned/);
  assert.doesNotMatch(r.text, /yes/i);
  assert.match(answer('does he use graphql').text, /not mentioned/);
});

test('declines to invent what is not in the portfolio', () => {
  assert.equal(m('What is his hourly rate?'), 'rates');
  assert.equal(m('how old is he'), 'personal');
  assert.equal(m('Does he have any certifications?'), 'certifications');
  assert.match(answer('Did he lead a team?').text, /doesn't list formal team-lead/);
  assert.equal(m('What is the airspeed velocity of an unladen swallow?'), 'unknown');
});

test('answers questions about an area of the stack', () => {
  assert.equal(m('is he good with databases'), 'skill-area:Data');
  assert.match(answer('what cloud services has he used').text, /AWS S3/);
});

test('is honest about being a bot', () => {
  assert.equal(m('are you a bot?'), 'bot');
  assert.match(answer('are you ai').text, /don't use a generative AI model/);
});

test('retrieval fallback finds specific facts', () => {
  const r = answer('Which project had multi-tenant isolation?');
  assert.match(r.text, /AskBase/);
  const o = answer('who worked on Oracle POS integrations');
  assert.match(o.text, /Ring N Bring/);
});
