import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GiftCard from '../../src/components/GiftCard';

const mockGift = {
  id: 1,
  name: "A partridge in a pear tree",
  shortName: "partridge",
  lyrics: "A partridge in a pear tree",
  imagePath: "/assets/images/partridge.png",
  audioPath: "/assets/audio/day-1.mp3",
  asciiArt: "ASCII art",
  position: { x: 50, y: 50 }
};

describe('GiftCard Component - User Story 1', () => {
  test('renders gift image with correct alt text', async () => {
    render(<GiftCard gift={mockGift} onHover={() => {}} onUnhover={() => {}} />);

    // Wait for image to load
    await waitFor(() => {
      const image = screen.getByAltText(mockGift.name);
      expect(image).toBeInTheDocument();
    });
  });

  test('applies correct positioning', () => {
    const { container } = render(
      <GiftCard gift={mockGift} onHover={() => {}} onUnhover={() => {}} />
    );

    const giftElement = container.querySelector('.gift');
    expect(giftElement).toHaveStyle({
      left: '50%',
      top: '50%'
    });
  });

  test('has cursor pointer style', () => {
    const { container } = render(
      <GiftCard gift={mockGift} onHover={() => {}} onUnhover={() => {}} />
    );

    const giftElement = container.querySelector('.gift');
    expect(giftElement).toHaveClass('gift');
  });
});

describe('GiftCard Component - User Story 2', () => {
  test('calls onHover callback when mouse enters', () => {
    const handleHover = jest.fn();
    const { container } = render(
      <GiftCard gift={mockGift} onHover={handleHover} onUnhover={() => {}} />
    );

    const giftElement = container.querySelector('.gift');
    fireEvent.mouseEnter(giftElement);

    expect(handleHover).toHaveBeenCalledWith(mockGift);
    expect(handleHover).toHaveBeenCalledTimes(1);
  });

  test('calls onUnhover callback when mouse leaves', () => {
    const handleUnhover = jest.fn();
    const { container } = render(
      <GiftCard gift={mockGift} onHover={() => {}} onUnhover={handleUnhover} />
    );

    const giftElement = container.querySelector('.gift');
    fireEvent.mouseLeave(giftElement);

    expect(handleUnhover).toHaveBeenCalled();
    expect(handleUnhover).toHaveBeenCalledTimes(1);
  });

  test('applies animation CSS class when hovered', () => {
    const { container } = render(
      <GiftCard gift={mockGift} onHover={() => {}} onUnhover={() => {}} />
    );

    const giftElement = container.querySelector('.gift');

    // Hover
    fireEvent.mouseEnter(giftElement);
    expect(giftElement).toHaveClass('gift--animating');

    // Unhover
    fireEvent.mouseLeave(giftElement);
    expect(giftElement).not.toHaveClass('gift--animating');
  });

  test('handles touch events on mobile (onTouchStart, onTouchEnd)', () => {
    const handleHover = jest.fn();
    const handleUnhover = jest.fn();
    const { container } = render(
      <GiftCard gift={mockGift} onHover={handleHover} onUnhover={handleUnhover} />
    );

    const giftElement = container.querySelector('.gift');

    // Touch start
    fireEvent.touchStart(giftElement);
    expect(handleHover).toHaveBeenCalledWith(mockGift);

    // Touch end
    fireEvent.touchEnd(giftElement);
    expect(handleUnhover).toHaveBeenCalled();
  });
});
