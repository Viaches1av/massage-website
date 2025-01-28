import { useTranslation } from 'react-i18next';
import styles from './Masseur.module.css';
import masseurImage from '../../assets/images/masseur.jpeg';

const Masseur = () => {
  const { t } = useTranslation('homepage');

  return (
    <section className={styles.masseur}>
      {/* <h2 className={styles.masseurTitle}>{t('masseur.title')}</h2> */}
      <div className={styles.masseurContent}>
        <div className={styles.masseurDetails}>
          <h3 className={styles.masseurName}>{t('masseur.name')}</h3>
          <div className={styles.masseurDescription}>
            {t('masseur.description')
              .split('\n\n') // Разбиваем текст на абзацы
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p> // Каждый абзац оформляется отдельно
              ))}
          </div>
        </div>
        <img
          src={masseurImage}
          alt={t('masseur.name')}
          className={styles.masseurImage}
        />
      </div>
    </section>
  );
};

export default Masseur;
