// Masseur.jsx
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Masseur.module.css';
import masseurImage from '../../assets/images/masseur.webp';

const Masseur = () => {
  const { t } = useTranslation('homepage');

  const masseurDetails = useMemo(() => ({
    name: t('masseur.name'),
    description: t('masseur.description'),
    title: t('masseur.title'),
  }), [t]);

  const descriptionParagraphs = useMemo(() => {
    return masseurDetails.description.split('\n\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  }, [masseurDetails.description]);

  return (
    <section className={styles.masseur}>
      {/* <h2 className={styles.masseurTitle}>{masseurDetails.title}</h2> */}
      <div className={styles.masseurContent}>
        <div className={styles.masseurDetails}>
          <h3 className={styles.masseurName}>{masseurDetails.name}</h3>
          <div className={styles.masseurDescription}>
            {descriptionParagraphs}
          </div>
        </div>
        <img
          src={masseurImage}
          alt={masseurDetails.name}
          className={styles.masseurImage}
        />
      </div>
    </section>
  );
};

export default React.memo(Masseur);
