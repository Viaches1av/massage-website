// MassageCard.jsx
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './MassageCard.module.css';
import { useTranslation } from 'react-i18next';
import ModalButton from '../modal-button/ModalButton';
import ModalForm from '../modal-form/ModalForm';
import { useNavigate } from 'react-router-dom';

const MassageCard = ({
  id,
  titleKey,
  descriptionKey,
  image,
  linkTo = '', // Параметр по умолчанию
}) => {
  const { t } = useTranslation('homepage');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const title = useMemo(() => t(titleKey), [t, titleKey]);
  const description = useMemo(() => t(descriptionKey), [t, descriptionKey]);

  const truncateDescription = useCallback((text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  }, []);

  const toggleModal = useCallback((e) => {
    e.stopPropagation();
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleCardClick = useCallback(() => {
    if (!isModalOpen) {
      const baseLink = linkTo.split('?')[0];
      navigate(`${baseLink}?selected=${id}`);
    }
  }, [isModalOpen, linkTo, navigate, id]);

  const handleOverlayClick = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={title}
        ></div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{truncateDescription(description, 80)}</p>
          <ModalButton text={t('footer.bookButton')} onClick={toggleModal} />
        </div>
      </div>
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={handleOverlayClick} // Закрываем окно при клике на оверлей
          role="presentation"
        >
          <div
            className={styles.modalContent}
            onClick={handleModalContentClick} // Предотвращаем закрытие при клике внутри модального окна
          >
            <ModalForm onClose={handleOverlayClick} />
          </div>
        </div>
      )}
    </>
  );
};

MassageCard.propTypes = {
  id: PropTypes.string.isRequired,
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
};

export default React.memo(MassageCard);
