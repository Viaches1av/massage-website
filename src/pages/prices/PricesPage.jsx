// src/pages/prices-page/PricesPage.jsx
import React, { useMemo } from 'react';
import styles from './PricesPage.module.css';
import PricesInfo from '../../components/prices-info/PricesInfo';
import { useTranslation } from 'react-i18next';

const PricesPage = () => {
  const { t } = useTranslation('prices-page');

  // Массив данных для цен, мемоизированный с помощью useMemo
  const prices = useMemo(() => [
    {
      id: 'face',
      service: t('services.face', { defaultValue: 'Face Massage' }),
      time: `20–25 ${t('minutes', { defaultValue: 'min' })}`, // Общий ключ для "минут"
      price: '60 PLN',
    },
    {
      id: 'classic',
      service: t('services.classic', { defaultValue: 'Classic Massage' }),
      time: `35-40 ${t('minutes', { defaultValue: 'min' })}`,
      price: '100 PLN',
    },
    {
      id: 'relaxing',
      service: t('services.relaxing', { defaultValue: 'Relaxing Massage' }),
      time: `${60} ${t('minutes', { defaultValue: 'min' })}`,
      price: '150 PLN',
    },
    {
      id: 'therapeutic',
      service: t('services.therapeutic', { defaultValue: 'Therapeutic Massage' }),
      time: `40-45 ${t('minutes', { defaultValue: 'min' })}`,
      price: '120 - 130 PLN',
    },
    {
      id: 'lymphaticDrainage',
      service: t('services.lymphaticDrainage', { defaultValue: 'Lymphatic Drainage Massage' }),
      time: `${60} ${t('minutes', { defaultValue: 'min' })}`,
      price: '160 PLN',
    },
  ], [t]);

  return (
    <div className={styles.container}>
      <h1>{t('title', { defaultValue: 'Price List' })}</h1>
      <PricesInfo prices={prices} />
    </div>
  );
};

// (Опционально) Оборачиваем компонент в React.memo для оптимизации
export default React.memo(PricesPage);
