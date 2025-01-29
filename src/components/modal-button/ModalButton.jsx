import PropTypes from 'prop-types';
import styles from './ModalButton.module.css';

const ModalButton = ({ text, onClick = () => {} }) => {
  return (
      <button className={styles.button} onClick={onClick}>
          <svg className={`${styles.icon} ${styles.ringing}`} width="20" height="20">
              <use xlinkHref="/sprite.svg#phone"></use>
          </svg>
          {text}
      </button>
  );
};

ModalButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default ModalButton;