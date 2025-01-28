import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.css";

const Gallery = ({ images }) => {
  // 1. Определяем хуки
  const [visibleSlides, setVisibleSlides] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef(null);

  // Определяем общее количество изображений
  const totalImages = images.length;

  // 2. Дублируем массив изображений
  const duplicationFactor = 5;
  const extendedImages = useMemo(() => {
    return Array.from({ length: duplicationFactor }, () => images).flat();
  }, [images, duplicationFactor]);

  const bigLength = extendedImages.length;

  // 3. Следим за шириной экрана и изменяем количество видимых слайдов
  useEffect(() => {
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setVisibleSlides(1);
      } else if (width <= 1024) {
        setVisibleSlides(3);
      } else {
        setVisibleSlides(5);
      }
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);

    return () => {
      window.removeEventListener("resize", updateVisibleSlides);
    };
  }, []);

  // 4. Устанавливаем индекс в середину расширенного массива при первом рендере
  useEffect(() => {
    const startIndex = Math.floor(bigLength / 2);
    setCurrentIndex(startIndex);
  }, [bigLength]);

  // 5. Обновляем позицию слайдера при изменении currentIndex
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.3s ease-in-out";
      const offsetIndex = currentIndex - Math.floor(visibleSlides / 2);
      const slideWidthPercent = 100 / visibleSlides;
      sliderRef.current.style.transform = `translateX(-${offsetIndex * slideWidthPercent}%)`;
    }
  }, [currentIndex, visibleSlides]);

  // 6. Обрабатываем завершение анимации
  const handleTransitionEnd = () => {
    if (!sliderRef.current) return;

    const minEdge = 2;
    const maxEdge = bigLength - 2;
    const midIndex = Math.floor(bigLength / 2);

    if (currentIndex <= minEdge) {
      jumpWithoutAnimation(midIndex);
    } else if (currentIndex >= maxEdge) {
      jumpWithoutAnimation(midIndex);
    }
  };

  // 7. Телепортируемся без анимации
  const jumpWithoutAnimation = (newIndex) => {
    if (!sliderRef.current) return;

    sliderRef.current.style.transition = "none";
    setCurrentIndex(newIndex);

    const offsetIndex = newIndex - Math.floor(visibleSlides / 2);
    const slideWidthPercent = 100 / visibleSlides;
    sliderRef.current.style.transform = `translateX(-${offsetIndex * slideWidthPercent}%)`;

    requestAnimationFrame(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transition = "transform 0.3s ease-in-out";
      }
    });
  };

  // 8. Кнопки вперёд/назад
  const nextImg = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevImg = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // 9. Условный рендер после всех хуков
  if (totalImages === 0) {
    return <div className={styles.error}>No images available</div>;
  }

  // 10. Основной рендер
  return (
    <div className={styles.gallery}>
      <button className={styles.arrow} onClick={prevImg}>
        ❮
      </button>

      <div className={styles.imageContainer}>
        <div
          className={styles.slider}
          ref={sliderRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: `${(bigLength * 100) / visibleSlides}%`,
          }}
        >
          {extendedImages.map((item, index) => {
            const position = index - currentIndex;
            const isCenter = position === 0;

            return (
              <div
                key={index}
                className={`${styles.imageWrapper} ${isCenter ? styles.center : ""}`}
                style={{
                  transform: `scale(${isCenter ? 0.99 : 0.86})`,
                  opacity:
                    isCenter
                      ? 1
                      : Math.abs(position) === 1
                      ? 0.8
                      : 0.6,
                }}
              >
                <img
                  src={typeof item === "string" ? item : item.image}
                  alt={`Slide ${index + 1}`}
                  className={styles.image}
                />
              </div>
            );
          })}
        </div>
      </div>

      <button className={styles.arrow} onClick={nextImg}>
        ❯
      </button>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        image: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
};

export default Gallery;
