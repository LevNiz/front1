import { useState } from 'react';
import noImg from '../../../assets/images/no-image.svg';

const ItemsSlider = () => {
  const images = [
    {
      id: 1,
      image:
        'https://i.natgeofe.com/n/874df281-d3e0-489a-98c0-6b840023b828/newyork_NationalGeographic_2328428_square.jpg',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1699694927472-46a4fcf68973?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw1NDA2MjN8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      image:
        'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1587483283491-40b2af304d7f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fDUwMHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 5,
      image:
        'https://thumbs.dreamstime.com/b/cold-snowy-winter-road-16246084.jpg',
    },
  ];
  const [mainImg, setMainImg] = useState(images[0]?.image);

  const handleClick = (index) => {
    const main = images[index];
    setMainImg(main?.image);
  };

  return (
    <div className='w-full mb-5 mm:mb-12 md:mb-0 px-4 mm:px-0 flex'>
      <div className='flex flex-col justify-center space-y-5'>
        {images !== null
          ? images?.map((el, index) => (
              <div
                key={index}
                className='!min-w-[80px] !w-[20%] h-[80px] bg-[#FBFBFB] rounded-lg overflow-hidden cursor-pointer'
                onClick={() => {
                  handleClick(index);
                }}
              >
                <img
                  src={el?.image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                  className='w-full h-full object-cover'
                />
              </div>
            ))
          : ''}
      </div>
      <div className='md:max-w-[480px] w-full h-[470px] overflow-hidden rounded-lg mx-auto bg-[#FBFBFB]'>
        <img
          src={mainImg ? mainImg : noImg}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImg;
          }}
          alt='*'
          className='w-full h-full object-contain rounded-lg'
        />
      </div>
    </div>
  );
};

export default ItemsSlider;
