// src/components/contact-details/ContactDetails.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactDetails.module.css';
import { useTranslation } from 'react-i18next';
import ModalButton from '../modal-button/ModalButton';
import ModalForm from '../modal-form/ModalForm';

const ContactDetails = ({selectedAddress,  }) => {
  const { t } = useTranslation('contact-page');
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = (e) => {
      e.stopPropagation(); // Остановка всплытия клика
      setIsModalOpen((prev) => !prev);
    };

  return (
    <section className={styles.details}>
      <h2>{t('contactPage.title')}</h2>
      <div className={styles.addressButtons}>
        {/* {addresses.map((address) => (
          <button
            key={address.id}
            className={`${styles.button} ${
              selectedAddress.id === address.id ? styles.active : ''
            }`}
            onClick={() => onAddressChange(address.id)}
          >
            {address.name}
          </button>
        ))} */}
      </div>
      <div className={styles.addressDetails}>
        <p>{t('contactPage.address')}: {selectedAddress.address}</p>
        <p>{t('contactPage.phone')}: +48 123 456 789</p>
        <p>{t('contactPage.email')}: contact@masaz.pl</p>
      </div>
              <ModalButton text={t('footer.bookButton')} onClick={toggleModal} />
            {isModalOpen && (
              <div
                className={styles.modalOverlay}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setIsModalOpen(false); // Закрытие при клике на оверлей
                }}
              >
                <ModalForm onClose={() => setIsModalOpen(false)} />
              </div>
            )}
    </section>
  );
};

ContactDetails.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedAddress: PropTypes.object.isRequired,
  onAddressChange: PropTypes.func.isRequired,
  onBookClick: PropTypes.func.isRequired,
};

export default ContactDetails;
