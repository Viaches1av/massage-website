// src/pages/contact-page/ContactPage.jsx
import React, { useState, useMemo, useCallback } from 'react';
import styles from './ContactPage.module.css';
import { addresses } from '../../data/massages';
import ContactDetails from '../../components/contact-details/ContactDetails';
import ModalForm from '../../components/modal-form/ModalForm';

const ContactPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  
  // Поскольку selectedAddress неизменяем, используем useMemo или просто константу
  const selectedAddress = useMemo(() => addresses[0], []);

  // Используем useCallback для мемоизации функции toggleModal
  const handleModalToggle = useCallback(() => {
    setModalOpen(prev => !prev);
  }, []);
  
  return (
    <>
      <div className={styles.container}>
        <ContactDetails
          selectedAddress={selectedAddress} // Передаём только необходимый пропс
        />
        {/* <Map coordinates={selectedAddress.coordinates} /> */}
      </div>
      {isModalOpen && <ModalForm onClose={handleModalToggle} />}
    </>
  );
};

// (Опционально) Оборачиваем компонент в React.memo для оптимизации
export default React.memo(ContactPage);
