// LanguageSwitcher.jsx
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.resolvedLanguage || 'pl');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const availableLanguages = ['pl', 'en', 'ua'];

    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setCurrentLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const changeLanguage = useCallback((lng) => {
        if (lng !== currentLanguage) {
            i18n.changeLanguage(lng);
        }
        setIsMenuOpen(false);
    }, [i18n, currentLanguage]);

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label="Switch language"
            >
                <svg className={styles.icon} width="20" height="20">
                    <use xlinkHref="/sprite.svg#languages"></use>
                </svg>
                {currentLanguage.toUpperCase()}
            </button>
            {isMenuOpen && (
                <ul className={styles.menu}>
                    {availableLanguages.map((lng) => (
                        <li
                            key={lng}
                            onClick={() => changeLanguage(lng)}
                            className={currentLanguage === lng ? styles.active : ''}
                        >
                            {lng.toUpperCase()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

LanguageSwitcher.propTypes = {};

export default LanguageSwitcher;
