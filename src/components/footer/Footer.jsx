// Footer.jsx
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';
import SocialButton from '../socialButton/SocialButton';
import ModalButton from '../modal-button/ModalButton';
import ModalForm from '../modal-form/ModalForm';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const { t } = useTranslation('layout');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback((e) => {
    e.stopPropagation();
    setIsModalOpen((prev) => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <NavLink to="/" className={styles.logo}>
          <img
            src={logo}
            alt={t('header.logo', { defaultValue: 'SOFIA' })}
            className={styles['logo-image']}
          />
        </NavLink>
        <div className={styles.socials}>
          <SocialButton icon="facebook" link="https://facebook.com" />
          <SocialButton icon="instagram" link="https://instagram.com" />
          <SocialButton icon="booksy" link="https://booksy.com/pl-pl/dl/show-business/188424?utm_medium=c2c_referral" />
        </div>
        <div className={styles.modalContainer}>
          <ModalButton text={t('footer.bookButton')} onClick={toggleModal} />
        </div>
      </div>
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal(); // Закрытие при клике на оверлей
          }}
        >
          <ModalForm onClose={closeModal} />
        </div>
      )}
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
