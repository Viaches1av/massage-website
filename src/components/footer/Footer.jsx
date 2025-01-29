import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import SocialButton from '../socialButton/SocialButton';
import ModalButton from '../modal-button/ModalButton';
import ModalForm from '../modal-form/ModalForm';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const { t } = useTranslation('layout');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (e) => {
    e.stopPropagation(); // Остановка всплытия клика
    setIsModalOpen((prev) => !prev);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <a href="/" className={styles.logo}>
          <img
            src={logo}
            alt={t('header.logo', { defaultValue: 'SOFIA' })}
            className={styles['logo-image']}
          />
        </a>
        <div className={styles.socials}>
          <SocialButton icon="facebook" link="https://facebook.com" />
          <SocialButton icon="instagram" link="https://instagram.com" />
          <SocialButton icon="booksy" link="https://booksy.com" />
        </div>
        <div className={styles.modalContainer}>
          <ModalButton text={t('footer.bookButton')} onClick={toggleModal} />
        </div>
      </div>
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
    </footer>
  );
};

export default Footer;
