// Navigation.jsx
import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Navigation.module.css';

const Navigation = () => {
    const { t } = useTranslation('layout');
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    return (
        <nav className={styles.navigation}>
            <button
                className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`}
                onClick={toggleMenu}
                aria-label={t('navigation.menuToggle')}
                aria-expanded={isMenuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div
                className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={closeMenu}
                >
                    {t('navigation.home')}
                </NavLink>
                <NavLink
                    to="/massage"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={closeMenu}
                >
                    {t('navigation.massage')}
                </NavLink>
                <NavLink
                    to="/prices"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={closeMenu}
                >
                    {t('navigation.prices')}
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={closeMenu}
                >
                    {t('navigation.contact')}
                </NavLink>
            </div>
        </nav>
    );
};

Navigation.propTypes = {};

export default Navigation;
