import styles from './HomePage.module.css';
import Masseur from '../../components/masseur/Masseur';
import Gallery from '../../components/gallery/Gallery';
import MassageCard from '../../components/massage-card/MassageCard';
import { useTranslation } from 'react-i18next';
import { massages } from '../../data/massages';
import images1 from '../../assets/images/images1.png';
import images2 from '../../assets/images/images2.png';
import images3 from '../../assets/images/images3.png';
import images4 from '../../assets/images/images4.png';
import images5 from '../../assets/images/images5.png';
import images6 from '../../assets/images/images6.png';
import images7 from '../../assets/images/images7.jpg';
import images8 from '../../assets/images/images8.png';
import images9 from '../../assets/images/images9.png';

const HomePage = () => {
  const { t } = useTranslation();

  // Массив с изображениями для галереи
  const galleryImages = [
    { image: images1 },
    { image: images2 },
    { image: images3 },
    { image: images4 },
    { image: images5 },
    { image: images6 },
    { image: images7 },
    { image: images8 },
    { image: images9 },
  ];

  // Массив с данными для карточек

  const handleBook = (massageTitle) => {
    alert(`${t('common.bookNow')} - ${massageTitle}`);
  };

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

export default HomePage;
