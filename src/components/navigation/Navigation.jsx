import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Navigation.module.css';

const Navigation = () => {
    const { t } = useTranslation('layout');
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className={styles.navigation}>
            {/* Бургер-иконка */}
            <button
                className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`}
                onClick={toggleMenu}
                aria-label={t('navigation.menuToggle')}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Полноэкранное меню */}
            <div
                className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={() => setMenuOpen(false)} // Закрываем меню после клика
                >
                    {t('navigation.home')}
                </NavLink>
                <NavLink
                    to="/massage"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={() => setMenuOpen(false)}
                >
                    {t('navigation.massage')}
                </NavLink>
                <NavLink
                    to="/prices"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={() => setMenuOpen(false)}
                >
                    {t('navigation.prices')}
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                    onClick={() => setMenuOpen(false)}
                >
                    {t('navigation.contact')}
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
