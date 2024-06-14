import React from 'react';
import { Carousel } from 'antd';
import image1 from '../../img/corsair-ram.webp';
import image2 from '../../img/Fuente-Seasonic.webp';
import image3 from '../../img/IntelI9.webp';
import image4 from '../../img/ssd-samsung.webp';
import "antd/dist/reset.css";
import "../../css/carrousel.css";


const Carrousel = () => (
  <div className='containerStyle'>
    <Carousel autoplay className='mt-30'>
      <div>
        <img src={image1} alt="Corsair RAM" className='contentStyle'/>
      </div>
      <div> 
        <img src={image2} alt="Fuente Seasonic" className='contentStyle' />
      </div>
      <div>
        <img src={image3} alt="Intel I9" className='contentStyle' />
      </div>
      <div>
        <img src={image4} alt="SSD Samsung" className='contentStyle' />
      </div>
    </Carousel>
  </div>
);

export default Carrousel;
