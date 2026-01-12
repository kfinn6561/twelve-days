import PropTypes from 'prop-types';

function GiftDetailContent({ content }) {
  if (!content) {
    return null;
  }

  return (
    <article className="detail-content">
      <h1 className="detail-content__title">{content.title}</h1>
      {content.subtitle && (
        <h2 className="detail-content__subtitle">{content.subtitle}</h2>
      )}

      {content.sections.map(section => (
        <section key={section.id} className="detail-content__section">
          <h3 className="detail-content__heading">{section.heading}</h3>

          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="detail-content__paragraph">
              {paragraph}
              {section.citations && section.citations.length > 0 && (
                <sup className="citations">
                  {section.citations.map(citeId => (
                    <a key={citeId} href={`#ref-${citeId}`}>
                      [{citeId}]
                    </a>
                  ))}
                </sup>
              )}
            </p>
          ))}

          {section.list && section.list.length > 0 && (
            <ul className="detail-content__list">
              {section.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {content.references && content.references.length > 0 && (
        <footer className="detail-content__references">
          <h4>References</h4>
          <ol>
            {content.references.map(ref => (
              <li key={ref.id} id={`ref-${ref.id}`}>
                {ref.text}
              </li>
            ))}
          </ol>
        </footer>
      )}
    </article>
  );
}

GiftDetailContent.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
        citations: PropTypes.arrayOf(PropTypes.string),
        list: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
    references: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default GiftDetailContent;
