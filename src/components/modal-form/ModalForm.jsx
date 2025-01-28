import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './ModalForm.module.css';

const ModalForm = ({ onClose }) => {
  const { t } = useTranslation('common');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    comment: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('modal.errors.firstName');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('modal.errors.lastName');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('modal.errors.phone');
    } else if (!/^[+]?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = t('modal.errors.phoneFormat');
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Если ошибок нет, отправляем данные
    setErrors({});
    setSuccessMessage(t('modal.successMessage'));

    // Отправка данных (например, на email через API)
    fetch('https://your-email-service/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: t('modal.emailSubject'),
        body: `${t('modal.emailBody.firstName')}: ${formData.firstName}\n${t(
          'modal.emailBody.lastName'
        )}: ${formData.lastName}\n${t('modal.emailBody.phone')}: ${
          formData.phone
        }\n${t('modal.emailBody.comment')}: ${formData.comment}`,
      }),
    });

    // Сброс формы
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      comment: '',
    });

    // Закрываем окно после паузы
    setTimeout(() => {
      onClose();
      setSuccessMessage('');
    }, 2000);
  };

  const modalContent = (
    <div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2>{t('modal.title')}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">{t('modal.firstName')}</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">{t('modal.lastName')}</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">{t('modal.phone')}</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="comment">{t('modal.comment')}</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </div>
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <button type="submit" className={styles.submitButton}>
            {t('modal.submit')}
          </button>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

ModalForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalForm;
