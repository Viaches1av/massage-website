import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './MassageCard.module.css';
import { useTranslation } from 'react-i18next';
import ModalButton from '../modal-button/ModalButton';
import ModalForm from '../modal-form/ModalForm';
import { useNavigate } from 'react-router-dom';

const MassageCard = ({
  id, // Добавляем id как пропс
  titleKey,
  descriptionKey,
  image,
  linkTo = '', // Значение по умолчанию
}) => {
  const { t } = useTranslation('homepage');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const title = t(titleKey);
  const description = t(descriptionKey);

  // Функция для обрезки описания
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  const toggleModal = (e) => {
    e.stopPropagation(); // Остановить всплытие клика
    setIsModalOpen((prev) => !prev);
  };

  const handleCardClick = () => {
    if (!isModalOpen) {
      const baseLink = linkTo.split('?')[0]; // Убираем все параметры из ссылки
      navigate(`${baseLink}?selected=${id}`); // Добавляем только параметр selected
    }
  };
  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{truncateDescription(description, 80)}</p>
          <ModalButton text={t('footer.bookButton')} onClick={toggleModal} />
        </div>
      </div>
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)} // Закрываем окно при клике на оверлей
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модального окна
          >
            <ModalForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

MassageCard.propTypes = {
  id: PropTypes.string.isRequired, // Новый пропс для id
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  linkTo: PropTypes.string, // Необязательный пропс
};

export default MassageCard;
