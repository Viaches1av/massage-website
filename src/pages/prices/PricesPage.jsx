// src/pages/prices-page/PricesPage.jsx
import styles from './PricesPage.module.css';
import PricesInfo from '../../components/prices-info/PricesInfo';
import { useTranslation } from 'react-i18next';

const PricesPage = () => {
  const { t } = useTranslation('prices-page');

  // Массив данных для цен
  const prices = [
    {
      id: 'face',
      service: t('services.face', { defaultValue: 'Face Massage' }),
      time: `25 ${t('minutes', { defaultValue: 'min' })}`, // Общий ключ для "минут"
      price: '60 PLN',
    },
    {
      id: 'classic',
      service: t('services.classic', { defaultValue: 'Classic Massage' }),
      time: `40 ${t('minutes', { defaultValue: 'min' })}`,
      price: '95 PLN',
    },
    {
      id: 'relaxing',
      service: t('services.relaxing', { defaultValue: 'Relaxing Massage' }),
      time: `60 ${t('minutes', { defaultValue: 'min' })}`,
      price: '133 PLN',
    },
    {
      id: 'therapeutic',
      service: t('services.therapeutic', { defaultValue: 'Therapeutic Massage' }),
      time: `40 ${t('minutes', { defaultValue: 'min' })}`,
      price: '114 PLN',
    },
    {
      id: 'lymphaticDrainage',
      service: t('services.lymphaticDrainage', { defaultValue: 'Lymphatic Drainage Massage' }),
      time: `60 ${t('minutes', { defaultValue: 'min' })}`,
      price: '142 PLN',
    },
  ];

  return (
    <div className={styles.container}>
      <h1>{t('title', { defaultValue: 'Price List' })}</h1>
      <PricesInfo prices={prices} />
    </div>
  );
};

export default PricesPage;
