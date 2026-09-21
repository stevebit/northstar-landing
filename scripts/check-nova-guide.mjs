import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Lightweight contract check without a test runner. Import via vite-node if needed.
const require = createRequire(import.meta.url);

async function loadMatcher() {
  try {
    return await import("../src/data/nova-guide.ts");
  } catch {
    const { register } = await import("node:module");
    try {
      register("tsx/esm", import.meta.url);
    } catch {
      // fall through
    }
    return await import("../src/data/nova-guide.ts");
  }
}

const { NOVA_FALLBACK, NOVA_CLINICAL_REFUSAL, matchNovaIntent, topicById } =
  await loadMatcher();

const book = topicById("book");
const cost = topicById("cost");
const included = topicById("included");
const ohip = topicById("ohip");
const emergency = topicById("emergency");
const after = topicById("after");

assert.match(cost.answer, /One Time Visit is \$39\.95/);
assert.match(cost.answer, /Northstar primary care is \$59\.95/);
assert.match(cost.answer, /Northstar family primary care is \$79\.95/);
assert.match(ohip.answer, /Ministry-rostered/);
assert.match(ohip.answer, /medically necessary insured care/);
assert.match(emergency.answer, /call 911/);
assert.match(emergency.answer, /nearest emergency department/);

assert.equal(matchNovaIntent("How do I book?").topic?.id, "book");
assert.equal(matchNovaIntent(book.question).text, book.answer);
assert.equal(matchNovaIntent("what does a visit cost").text, cost.answer);
assert.equal(
  matchNovaIntent("what's included in primary care").text,
  included.answer,
);
assert.equal(matchNovaIntent("is this covered by OHIP?").text, ohip.answer);
assert.equal(matchNovaIntent("I feel really sick").text, emergency.answer);
assert.equal(matchNovaIntent("what happens after").text, after.answer);
assert.equal(matchNovaIntent("chest pain").text, emergency.answer);
assert.equal(
  matchNovaIntent("can you diagnose this rash").text,
  NOVA_CLINICAL_REFUSAL,
);
assert.equal(matchNovaIntent("look at this photo").text, NOVA_CLINICAL_REFUSAL);
assert.equal(matchNovaIntent("what is the weather").text, NOVA_FALLBACK);

console.log("nova-guide intents: ok");
