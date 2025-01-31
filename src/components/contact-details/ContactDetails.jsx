// ContactDetails.jsx
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactDetails.module.css';
import { useTranslation } from 'react-i18next';
import ModalButton from '../modal-button/ModalButton';
import ModalForm from '../modal-form/ModalForm';

const ContactDetails = ({ selectedAddress }) => {
  const { t } = useTranslation('contact-page');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Используем useCallback для toggleModal
  const toggleModal = useCallback((e) => {
    e.stopPropagation(); // Остановка всплытия клика
    setIsModalOpen((prev) => !prev);
  }, []);
  
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  
  return (
    <section className={styles.details}>
      <h2>{t('contactPage.title')}</h2>
      <div className={styles.addressButtons}>
        {/* Здесь можно добавить кнопки для изменения адреса, если нужно */}
      </div>
      <div className={styles.addressDetails}>
        <p>{t('contactPage.address')}: {selectedAddress.address}</p>
        <p>{t('contactPage.phone')}: +48 888 192 894</p>
        <p>{t('contactPage.email')}: contact@masaz.pl</p>
      </div>
      <ModalButton text={t('footer.bookButton')} onClick={toggleModal} />
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={closeModal} // Закрываем окно при клике на оверлей
          role="presentation"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модального окна
          >
            <ModalForm onClose={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
};

ContactDetails.propTypes = {
  selectedAddress: PropTypes.shape({
    id: PropTypes.number.isRequired, // Изменено с string на number
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(ContactDetails);
