// PricesInfo.jsx
import React, { useMemo } from 'react';
import styles from './PricesInfo.module.css';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const PricesInfo = ({ prices }) => {
  const { t } = useTranslation('prices-page'); // Используем namespace 'prices-page'

  // Используем useMemo для кеширования содержимого таблицы
  const tableContent = useMemo(() => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{t('tableHeaders.service', { defaultValue: 'Service' })}</th>
          <th>{t('tableHeaders.time', { defaultValue: 'Duration' })}</th>
          <th>{t('tableHeaders.price', { defaultValue: 'Price' })}</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price) => (
          <tr key={price.id}>
            <td>{price.service}</td>
            <td>{price.time}</td>
            <td>{price.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ), [prices, t]);

  return tableContent;
};

// Валидация пропсов
PricesInfo.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      service: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// (Опционально) Обёртываем компонент в React.memo для оптимизации
export default React.memo(PricesInfo);
