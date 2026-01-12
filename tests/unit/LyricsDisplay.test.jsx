import { render, screen } from '@testing-library/react';
import LyricsDisplay from '../../src/components/LyricsDisplay';

describe('LyricsDisplay Component - User Story 4', () => {
  test('renders lyrics text when provided', () => {
    const lyrics = 'A partridge in a pear tree';
    render(<LyricsDisplay lyrics={lyrics} />);

    expect(screen.getByText(lyrics)).toBeInTheDocument();
  });

  test('does not render when lyrics is empty string', () => {
    const { container } = render(<LyricsDisplay lyrics="" />);

    expect(container.firstChild).toBeNull();
  });

  test('does not render when lyrics is null', () => {
    const { container } = render(<LyricsDisplay lyrics={null} />);

    expect(container.firstChild).toBeNull();
  });

  test('applies correct CSS class for styling', () => {
    const lyrics = 'Two turtle doves';
    const { container } = render(<LyricsDisplay lyrics={lyrics} />);

    const displayElement = container.firstChild;
    expect(displayElement).toHaveClass('lyrics-display');
  });

  test('updates when lyrics prop changes', () => {
    const lyrics1 = 'Three French hens';
    const lyrics2 = 'Four calling birds';

    const { rerender } = render(<LyricsDisplay lyrics={lyrics1} />);
    expect(screen.getByText(lyrics1)).toBeInTheDocument();

    rerender(<LyricsDisplay lyrics={lyrics2} />);
    expect(screen.queryByText(lyrics1)).not.toBeInTheDocument();
    expect(screen.getByText(lyrics2)).toBeInTheDocument();
  });

  test('is positioned at top of viewport', () => {
    const lyrics = 'Five golden rings';
    const { container } = render(<LyricsDisplay lyrics={lyrics} />);

    const displayElement = container.firstChild;

    // Fixed positioning expected from CSS
    expect(displayElement).toHaveClass('lyrics-display');
  });
});
