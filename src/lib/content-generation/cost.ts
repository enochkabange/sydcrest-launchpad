/**
 * Cost estimate shown before a batch is submitted. Prices are US dollars per
 * million tokens at standard rates (from the Claude API pricing page,
 * October 2026); the Batches API bills every token at half price.
 * The cached system prompt is written with a 1 hour TTL (2x input price) and
 * read back at the model's cache read price. Cache hits in a batch are best
 * effort, so the estimate gives a range: every request writes the cache
 * (high) or only the first one does (low).
 */
export type ModelPricing = { input: number; output: number; cacheRead: number };

export const PRICING: Record<string, ModelPricing> = {
  "claude-sonnet-5-5": { input: 2, output: 10, cacheRead: 0.2 },
  "claude-haiku-5-5": { input: 0.1, output: 0.5, cacheRead: 0.01 },
  "claude-opus-5-5": { input: 4, output: 20, cacheRead: 0.2 },
};

export const BATCH_DISCOUNT = 0.5;
export const CACHE_WRITE_1H_MULTIPLIER = 2;

/**
 * Typical output per node: about 1,500 tokens of JSON plus room for adaptive
 * thinking. A deliberate overestimate; max_tokens caps the real worst case.
 */
export const ESTIMATED_OUTPUT_TOKENS_PER_NODE = 4_000;

/**
 * Rough token count without an API call: about 4 characters per token for
 * English, rounded up to 3.5 so the estimate errs high.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 3.5);
}

export type CostEstimate = {
  model: string;
  requests: number;
  systemTokens: number;
  userTokens: number;
  outputTokens: number;
  /** Dollars, batch rates, if only the first request writes the cache. */
  lowUsd: number;
  /** Dollars, batch rates, if every request writes the cache. */
  highUsd: number;
};

export function estimateBatchCost(input: {
  model: string;
  systemPrompt: string;
  userPrompts: string[];
  outputTokensPerRequest?: number;
}): CostEstimate | null {
  const price = PRICING[input.model];
  if (!price) return null;
  const n = input.userPrompts.length;
  const systemTokens = estimateTokens(input.systemPrompt);
  const userTokens = input.userPrompts.reduce((sum, p) => sum + estimateTokens(p), 0);
  const outputTokens = n * (input.outputTokensPerRequest ?? ESTIMATED_OUTPUT_TOKENS_PER_NODE);

  const perM = (tokens: number, usdPerM: number) => (tokens / 1_000_000) * usdPerM;
  const write = perM(systemTokens, price.input * CACHE_WRITE_1H_MULTIPLIER);
  const read = perM(systemTokens, price.cacheRead);
  const variable = perM(userTokens, price.input) + perM(outputTokens, price.output);

  const high = n === 0 ? 0 : (n * write + variable) * BATCH_DISCOUNT;
  const low = n === 0 ? 0 : (write + (n - 1) * read + variable) * BATCH_DISCOUNT;

  return {
    model: input.model,
    requests: n,
    systemTokens,
    userTokens,
    outputTokens,
    lowUsd: round4(low),
    highUsd: round4(high),
  };
}

function round4(n: number) {
  return Math.round(n * 10_000) / 10_000;
}

export function formatUsd(n: number): string {
  return n < 0.01 && n > 0 ? "under $0.01" : `$${n.toFixed(2)}`;
}
