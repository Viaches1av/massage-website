// src/pages/contact-page/ContactPage.jsx
import styles from './ContactPage.module.css';
import { useState } from 'react';
import { addresses } from '../../data/massages';
import ContactDetails from '../../components/contact-details/ContactDetails';
// import Map from '../../components/map/Map';
import ModalForm from '../../components/modal-form/ModalForm';

const ContactPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]); // Состояние для выбранного адреса

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const handleAddressChange = (id) => {
    const newAddress = addresses.find((address) => address.id === id);
    setSelectedAddress(newAddress);
  };

  return (
    <>
      <div className={styles.container}>
        <ContactDetails
          addresses={addresses}
          selectedAddress={selectedAddress}
          onAddressChange={handleAddressChange}
          onBookClick={handleModalToggle}
        />
        {/* <Map coordinates={selectedAddress.coordinates} /> */}
      </div>
      {isModalOpen && <ModalForm onClose={handleModalToggle} />}
    </>
  );
};

export default ContactPage;
