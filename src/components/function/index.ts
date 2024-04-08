import img1 from '../../assets/images/img-1.jpg';
import img2 from '../../assets/images/img-2.jpg';
import img3 from '../../assets/images/img-3.jpg';
import img4 from '../../assets/images/img-4.jpg';
import img5 from '../../assets/images/img-5.jpg';
import img6 from '../../assets/images/img-6.jpg';
import img7 from '../../assets/images/img-7.jpg';
import img8 from '../../assets/images/img-8.jpg';
import img9 from '../../assets/images/img-9.jpg';
import img10 from '../../assets/images/img-10.jpg';
import img11 from '../../assets/images/img-11.jpg';
import img12 from '../../assets/images/img-12.jpg';
import img13 from '../../assets/images/img-13.jpg';
import img14 from '../../assets/images/img-14.jpg';
import img15 from '../../assets/images/img-15.jpg';
import img16 from '../../assets/images/img-16.jpg';
import img17 from '../../assets/images/img-7.jpg';
import img18 from '../../assets/images/img-18.jpg';
import img19 from '../../assets/images/img-19.jpg';
import img20 from '../../assets/images/img-20.jpg';
import img21 from '../../assets/images/img-21.jpg';
import img22 from '../../assets/images/img-22.jpg';

export const isValidTableId = (tableId: string) => {
    // Regular expression to match the format "Zone B - T1" where "B" can be a letter or number,
    // and "T" is followed by one or more numbers.
    const regex = /^Zone\s+[A-Za-z0-9]+\s+-\s+T\d+$/i;
  
    return regex.test(tableId);
  };

  export const backgrounds = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22];