// SocialButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SocialButton.module.css';

const SocialButton = ({ icon, link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
            <svg className={styles.icon} width="24" height="24" aria-hidden="true">
                <use xlinkHref={`/sprite.svg#${icon}`}></use>
            </svg>
        </a>
    );
};

SocialButton.propTypes = {
    icon: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

// (Опционально) Оборачиваем компонент в React.memo для оптимизации
export default React.memo(SocialButton);
