// ModalButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalButton.module.css';

const ModalButton = React.memo(({ text, onClick = () => {} }) => { // Параметр по умолчанию
  return (
      <button className={styles.button} onClick={onClick}>
          <svg className={`${styles.icon} ${styles.ringing}`} width="20" height="20" aria-hidden="true">
              <use xlinkHref="/sprite.svg#phone"></use>
          </svg>
          {text}
      </button>
  );
});

ModalButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

// Удаляем ModalButton.defaultProps

ModalButton.displayName = 'ModalButton'; // Рекомендуется добавить displayName

export default ModalButton;
