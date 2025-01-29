import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import Navigation from '../navigation/Navigation';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';
import logo from '../../assets/images/logo.png'; // Импорт изображения

const Header = () => {
    const { t } = useTranslation('layout');

    return (
        <header className={styles.header}>
            <div className={styles['header-content']}>
                <a href="/" className={styles.logo}>
                    <img src={logo} alt={t('header.logo', { defaultValue: 'SOFIA' })} className={styles['logo-image']} />
                </a>
                <Navigation />
                <div className={styles.switchers}>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
};

export default Header;
