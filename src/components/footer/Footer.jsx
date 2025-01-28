import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import SocialButton from '../socialButton/SocialButton';
import ModalButton from '../modal-button/ModalButton';
import ModalForm from '../modal-form/ModalForm';

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
        <div className={styles.logo}>
          <span className={styles['logo-text']}>{t('footer.logo')}</span>
          {/* <span className={styles['logo-icon']}>✨</span> */}
        </div>
        <div className={styles.socials}>
          <SocialButton icon="facebook" link="https://facebook.com" />
          <SocialButton icon="instagram" link="https://instagram.com" />
          <SocialButton icon="twitter" link="https://twitter.com" />
        </div>
        <ModalButton text={t('footer.bookButton')} onClick={toggleModal} />
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
