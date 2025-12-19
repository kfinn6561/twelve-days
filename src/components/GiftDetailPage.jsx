import { useContentLoader } from '../hooks/useContentLoader';
import { gifts } from '../data/gifts';
import BackButton from './BackButton';
import GiftDetailContent from './GiftDetailContent';
import { useImageFallback } from '../hooks/useImageFallback';
import ErrorFallback from './ErrorFallback';

function GiftDetailPage({ giftId, onBack }) {
  const gift = gifts.find(g => g.id === giftId);
  const { content, error } = useContentLoader(giftId);
  const { src, error: imageError } = useImageFallback(gift?.imagePath, gift?.asciiArt);

  if (error || !content || !gift) {
    return (
      <ErrorFallback
        message="Content unavailable for this gift"
        onBack={onBack}
      />
    );
  }

  return (
    <div className="detail-page">
      <BackButton onClick={onBack} />

      <div className="detail-page__hero">
        {imageError ? (
          <pre className="detail-page__ascii">{gift.asciiArt}</pre>
        ) : (
          <img
            className="detail-page__image"
            src={src}
            alt={gift.name}
          />
        )}
      </div>

      <GiftDetailContent content={content} />
    </div>
  );
}

export default GiftDetailPage;
