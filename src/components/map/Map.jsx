// src/components/map/Map.jsx
import styles from './Map.module.css';
import { useTranslation } from 'react-i18next';

const Map = ({ coordinates }) => {
  const { t } = useTranslation('contact-page');
  const { lat, lng } = coordinates;

  return (
    <section className={styles.map}>
      <h2>{t('contactPage.ourLocation', { defaultValue: 'Our Location' })}</h2>
      <iframe
        title={t('contactPage.iframeTitle', { defaultValue: 'Massage Studio Location' })}
        src={`https://www.google.com/maps/embed/v1/place?key=ВАШ_API_KEY&q=${lat},${lng}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>
  );
};

export default Map;
