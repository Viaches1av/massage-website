// src/pages/home/HomePage.jsx
import React, { useMemo, useCallback } from 'react';
import styles from './HomePage.module.css';
import Masseur from '../../components/masseur/Masseur';
import Gallery from '../../components/gallery/Gallery';
import MassageCard from '../../components/massage-card/MassageCard';
import { useTranslation } from 'react-i18next';
import { massages } from '../../data/massages';
import images1 from '../../assets/images/images1.webp';
import images2 from '../../assets/images/images2.webp';
import images3 from '../../assets/images/images3.webp';
import images4 from '../../assets/images/images4.webp';
import images5 from '../../assets/images/images5.webp';
import images6 from '../../assets/images/images6.webp';
import images7 from '../../assets/images/images7.webp';
import images8 from '../../assets/images/images8.webp';
import images9 from '../../assets/images/images9.webp';

const HomePage = () => {
  const { t } = useTranslation();

  // Массив с изображениями для галереи, мемоизированный с помощью useMemo
  const galleryImages = useMemo(() => [
    { image: images1 },
    { image: images2 },
    { image: images3 },
    { image: images4 },
    { image: images5 },
    { image: images6 },
    { image: images7 },
    { image: images8 },
    { image: images9 },
  ], []);

  // Используем useCallback для handleBook, мемоизируя функцию
  const handleBook = useCallback((massageTitle) => {
    alert(`${t('common.bookNow')} - ${massageTitle}`);
  }, [t]);

  return (
    <div className={styles.container}>
      <Masseur />
      <Gallery images={galleryImages} />
      <div className={styles.cards}>
        {massages.map((massage) => (
          <MassageCard
            key={massage.id}
            id={massage.id}
            titleKey={massage.titleKey}
            descriptionKey={massage.descriptionKey}
            image={massage.image}
            linkTo={`/massage?selected=${massage.id}`}
            onBook={handleBook}
          />
        ))}
      </div>
    </div>
  );
};

// (Опционально) Оборачиваем компонент в React.memo для оптимизации
export default React.memo(HomePage);
