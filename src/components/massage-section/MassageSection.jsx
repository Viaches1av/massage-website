import PropTypes from 'prop-types';
import styles from './MassageSection.module.css';

const MassageSection = ({
  id,
  title,
  description,
  image,
  isHighlighted = false, // Значение по умолчанию
  isFading = false, // Значение по умолчанию
}) => {
  return (
    <section
      id={id}
      className={`${styles.section} ${isHighlighted ? styles.highlight : ''} ${
        isFading ? styles.fadeOut : ''
      }`}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

MassageSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  isFading: PropTypes.bool,
};

export default MassageSection;
