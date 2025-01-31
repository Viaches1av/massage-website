// Map.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './Map.module.css';
import { useTranslation } from 'react-i18next';

const Map = ({ coordinates }) => {
  const { t } = useTranslation('contact-page');
  const { lat, lng } = coordinates;

  // Кешируем src с помощью useMemo
  const src = useMemo(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}`;
  }, [lat, lng]);

  return (
    <section className={styles.map}>
      <h2>{t('contactPage.ourLocation', { defaultValue: 'Our Location' })}</h2>
      <iframe
        title={t('contactPage.iframeTitle', { defaultValue: 'Massage Studio Location' })}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </section>
  );
};

Map.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

// (Опционально) Оборачиваем компонент в React.memo для оптимизации
export default React.memo(Map);
