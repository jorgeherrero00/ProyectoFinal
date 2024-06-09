import React from 'react';
import { Carousel } from 'antd';
import image1 from '../../img/corsair-ram.webp';
import image2 from '../../img/Fuente-Seasonic.webp';
import image3 from '../../img/IntelI9.webp';
import image4 from '../../img/ssd-samsung.webp';
import "antd/dist/reset.css";
import "../../css/carrousel.css";

const contentStyle = {
  width: '60%',
  height: '60%',
  objectFit: 'contain', 
  padding: '20px', 
  margin: '0 auto',
};

const containerStyle = {
  width: '60%',
  height: 'auto',
  margin: '5rem auto', 
  padding: '0px 5px',
  borderRadius: '10px', 
  overflow: 'hidden', 
  background: '#262626', 
};

const Carrousel = () => (
  <div style={containerStyle} className=''>
    <Carousel autoplay className='mt-30'>
      <div>
        <img src={image1} alt="Corsair RAM" style={contentStyle} />
      </div>
      <div>
        <img src={image2} alt="Fuente Seasonic" style={contentStyle} />
      </div>
      <div>
        <img src={image3} alt="Intel I9" style={contentStyle} />
      </div>
      <div>
        <img src={image4} alt="SSD Samsung" style={contentStyle} />
      </div>
    </Carousel>
  </div>
);

export default Carrousel;
