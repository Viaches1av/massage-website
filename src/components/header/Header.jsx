import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import Navigation from '../navigation/Navigation';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';

const Header = () => {
    const { t } = useTranslation('layout');
    console.log('Rendering Header...'); // Проверка рендера компонента

    const logoText = t('header.logo', { defaultValue: 'Default Logo' }); // Добавлен fallback

    return (
        <header className={styles.header}>
            <div className={styles['header-content']}>
                <a href="/" className={styles.logo}>
                    <span className={styles['logo-text']}>{logoText}</span>
                    {/* <span className={styles['logo-icon']}>✨</span> */}
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
