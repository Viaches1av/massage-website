import PropTypes from 'prop-types';
import styles from './SocialButton.module.css';

const SocialButton = ({ icon, link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
            <img src={`/assets/icons/${icon}.svg`} alt={`${icon} icon`} className={styles.icon} />
        </a>
    );
};

SocialButton.propTypes = {
    icon: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default SocialButton;
