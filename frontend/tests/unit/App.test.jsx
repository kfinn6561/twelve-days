import { render, screen, waitFor } from '@testing-library/react';
import App from '../../src/components/App';
import { gifts } from '../../src/data/gifts';

describe('App Component - User Story 1', () => {
  test('renders 12 GiftCard components', async () => {
    render(<App />);

    // Wait for images to load
    await waitFor(() => {
      // Check that all 12 gifts are rendered
      gifts.forEach(gift => {
        const giftElement = screen.getByAltText(gift.name);
        expect(giftElement).toBeInTheDocument();
      });
    });
  });

  test('renders correct number of gift cards', () => {
    const { container } = render(<App />);
    const giftCards = container.querySelectorAll('.gift');
    expect(giftCards).toHaveLength(12);
  });
});
