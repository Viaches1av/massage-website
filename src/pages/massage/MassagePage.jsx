import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './MassagePage.module.css';
import MassageSection from '../../components/massage-section/MassageSection';
import { useTranslation } from 'react-i18next';
import { massages } from '../../data/massages';

const MassagePage = () => {
  const { t } = useTranslation('massage-page');
  const location = useLocation();
  const [highlightedId, setHighlightedId] = useState(null);
  const [isFading, setIsFading] = useState(false);

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
      const timeout = setTimeout(() => {
        const element = document.getElementById(highlightedId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          console.warn(`Element with ID ${highlightedId} not found.`);
        }
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [highlightedId]);

  // Управление подсветкой
  useEffect(() => {
    if (highlightedId) {
      const fadeTimeout = setTimeout(() => {
        setIsFading(true); // Начинаем угасание
        setTimeout(() => {
          setHighlightedId(null); // Убираем подсветку полностью
          setIsFading(false);
        }, 1000); // Время угасания совпадает с CSS transition
      }, 2000); // Задержка перед началом угасания

      return () => clearTimeout(fadeTimeout);
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

export default MassagePage;
