import PropTypes from 'prop-types';
import styles from './ModalButton.module.css';

const ModalButton = ({ text, onClick = () => {} }) => {
  return (
      <button className={styles.button} onClick={onClick}>
          {text}
      </button>
  );
};

ModalButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default ModalButton;
