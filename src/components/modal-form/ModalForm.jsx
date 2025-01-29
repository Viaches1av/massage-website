import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation, Trans } from 'react-i18next';
import styles from './ModalForm.module.css';
import { Info } from 'lucide-react';

const ModalForm = ({ onClose }) => {
  const { t } = useTranslation('common');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const timeoutRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('modal-open');
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
    } else if (!/^[+]?\d{9,15}$/.test(formData.phone)) {
      newErrors.phone = t('modal.errors.phoneFormat');
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSuccessMessage(t('modal.successMessage'));
    setIsLoading(true);

    try {
      const response = await fetch('https://your-email-service/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: t('modal.emailSubject'),
          body: `${t('modal.emailBody.firstName')}: ${formData.firstName}\n${t('modal.emailBody.lastName')}: ${formData.lastName}\n${t('modal.emailBody.phone')}: ${formData.phone}\n${t('modal.emailBody.comment')}: ${formData.comment}`
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Дополнительная обработка успешного ответа, если необходимо
    } catch (error) {
      setErrors({ submit: t('modal.errors.submit') });
      setSuccessMessage('');
      console.error('Ошибка при отправке формы:', error);
      setIsLoading(false);
      return;
    }

    setFormData({ firstName: '', lastName: '', phone: '', comment: '' });
    timeoutRef.current = setTimeout(() => {
      onClose();
      setSuccessMessage('');
      setIsLoading(false);
    }, 2000);
  };

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const modalContent = (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t('modal.closeButtonLabel')}
        >
          ✕
        </button>
        <h2 id="modal-title">{t('modal.title')}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              ref={firstInputRef}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t('modal.placeholders.firstName')}
              className={styles.input}
              required
              aria-required="true"
              aria-invalid={errors.firstName ? 'true' : 'false'}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && (
              <span id="firstName-error" className={styles.error}>
                {errors.firstName}
              </span>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t('modal.placeholders.lastName')}
              className={styles.input}
              required
              aria-required="true"
              aria-invalid={errors.lastName ? 'true' : 'false'}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && (
              <span id="lastName-error" className={styles.error}>
                {errors.lastName}
              </span>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('modal.placeholders.phone')}
              className={styles.input}
              required
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className={styles.error}>
                {errors.phone}
              </span>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder={t('modal.placeholders.comment')}
              className={styles.textarea}
              aria-invalid={errors.comment ? 'true' : 'false'}
              aria-describedby={errors.comment ? 'comment-error' : undefined}
            />
            {errors.comment && (
              <span id="comment-error" className={styles.error}>
                {errors.comment}
              </span>
            )}
            <div className={styles.tooltipContainer}>
              <Info
                className={styles.infoIcon}
                onClick={toggleTooltip}
                aria-label={t('modal.tooltipButtonLabel')}
                tabIndex="0"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleTooltip();
                  }
                }}
              />
            </div>
            {showTooltip && (
              <div className={styles.tooltip} role="tooltip">
                <Trans i18nKey="modal.tooltipText">
                  Ви можете написати в коментарі все, що вас турбує, і ми перетелефонуємо вам найближчим часом. Якщо ви точно знаєте, що хочете і коли, ви можете перейти на <a href="https://booksy.com" target="_blank" rel="noopener noreferrer">Booksy</a> та записатися на найближчий вільний час та бажану процедуру.
                </Trans>
              </div>
            )}
          </div>

          {errors.submit && (
            <p className={styles.error}>{errors.submit}</p>
          )}
          {successMessage && (
            <p className={styles.success}>{successMessage}</p>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? t('modal.submitting') : t('modal.submit')}
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
