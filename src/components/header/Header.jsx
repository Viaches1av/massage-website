// Header.jsx
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Navigation from '../navigation/Navigation';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';
import logo from '../../assets/images/logo.png';

const Header = () => {
    const { t } = useTranslation('layout');

    return (
        <header className={styles.header}>
            <div className={styles['header-content']}>
                <NavLink to="/" className={styles.logo}>
                    <img
                        src={logo}
                        alt={t('header.logo', { defaultValue: 'SOFIA' })}
                        className={styles['logo-image']}
                    />
                </NavLink>
                <Navigation />
                <div className={styles.switchers}>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {};

export default Header;
