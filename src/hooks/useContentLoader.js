import { giftContent } from '../data/giftContent';

export function useContentLoader(giftId) {
  const content = giftContent[giftId] || null;
  const error = content === null;
  const loading = false;  // Instant for bundled content

  return { content, error, loading };
}
