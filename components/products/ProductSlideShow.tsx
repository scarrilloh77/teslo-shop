import { Slide } from 'react-slideshow-image';
import styles from './ProductSlideShow.module.css';
import 'react-slideshow-image/dist/styles.css';

interface Props {
  images: string[];
}

export const ProductSlideShow = ({ images }: Props) => {
  return (
    <Slide easing="ease" duration={5000} indicators>
      {images?.map((image) => {
        return (
          <div className={styles['eacth-slide']} key={image}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
