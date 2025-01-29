import PropTypes from 'prop-types';
import styles from './SocialButton.module.css';

const SocialButton = ({ icon, link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
            <svg className={styles.icon} width="24" height="24">
                <use xlinkHref={`/sprite.svg#${icon}`}></use>
            </svg>
        </a>
    );
};

SocialButton.propTypes = {
    icon: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default SocialButton;
