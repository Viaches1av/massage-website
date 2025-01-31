// src/pages/massage-page/MassagePage.jsx
import React, { useEffect, useState, useRef} from 'react';
import { useLocation } from 'react-router-dom'; // Переносим useLocation из react-router-dom
import styles from './MassagePage.module.css';
import MassageSection from '../../components/massage-section/MassageSection';
import { useTranslation } from 'react-i18next';
import { massages as importedMassages } from '../../data/massages';

const MassagePage = () => {
  const { t } = useTranslation('massage-page');
  const location = useLocation(); // Теперь useLocation корректно работает
  const [highlightedId, setHighlightedId] = useState(null);
  const [isFading, setIsFading] = useState(false);

  // Прямое присвоение без useMemo
  const massages = importedMassages;

  // Refs для хранения ID таймаутов для корректной очистки
  const scrollTimeoutRef = useRef(null);
  // Удалены: fadeTimeoutRef, removeHighlightTimeoutRef

  // Считываем параметр selected из URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selected = queryParams.get('selected');

    if (selected) {
      setHighlightedId(selected);
    }
  }, [location.search]);

  // Прокрутка после рендеринга карточек
  useEffect(() => {
    if (highlightedId) {
      scrollTimeoutRef.current = setTimeout(() => {
        const element = document.getElementById(highlightedId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          console.warn(`Element with ID ${highlightedId} not found.`);
        }
      }, 200);

      // Очистка таймаута при размонтировании или изменении highlightedId
      return () => {
        clearTimeout(scrollTimeoutRef.current);
      };
    }
  }, [highlightedId]);

  // Управление подсветкой
  useEffect(() => {
    if (highlightedId) {
      const fadeTimeout = setTimeout(() => {
        setIsFading(true); // Начинаем угасание

        const removeHighlightTimeout = setTimeout(() => {
          setHighlightedId(null); // Убираем подсветку полностью
          setIsFading(false);
        }, 1000); // Время угасания совпадает с CSS transition

        // Очистка таймаутов при размонтировании или изменении highlightedId
        return () => {
          clearTimeout(removeHighlightTimeout);
        };
      }, 2000); // Задержка перед началом угасания

      // Очистка таймаута при размонтировании или изменении highlightedId
      return () => {
        clearTimeout(fadeTimeout);
      };
    }
  }, [highlightedId]);

  return (
    <div className={styles.container}>
      {massages.map((massage) => (
        <MassageSection
          key={massage.id}
          id={massage.id}
          title={t(massage.titleKey)}
          description={t(massage.descriptionKey)}
          image={massage.image}
          isHighlighted={massage.id === highlightedId}
          isFading={massage.id === highlightedId && isFading} // Добавляем состояние угасания
        />
      ))}
    </div>
  );
};

// (Опционально) Оборачиваем компонент в React.memo для оптимизации
export default React.memo(MassagePage);
