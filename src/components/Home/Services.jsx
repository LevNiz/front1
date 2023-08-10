import serviceVector1 from './../../assets/images/service-vector1.png';
import serviceVector2 from './../../assets/images/service-vector2.png';

const Services = () => {
  return (
    <div className='min-h-[540px] py-14 md:py-20 bg-black relative'>
      <img className='absolute bottomC-0 left-0' src={serviceVector1} alt="*" />
      <img className='absolute top-0 right-0' src={serviceVector2} alt="*" />
      <div className='content text-white'>
        <h1 className='text-[40px] font-medium text-center'>
          [ Наши услуги ]
        </h1>
        <p className="text-xl sm:text-2xl mt-12">
          Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
          tellus eget felis magna a. Libero eleifend turpis aliquet pulvinar.
          Elementum vitae dignissim convallis eget iaculis integer nam sit in.
          Orci sed auctor pharetra placerat cras integer vitae.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
          tellus eget felis magna a. Libero eleifend turpis aliquet pulvinar.
          Elementum vitae dignissim convallis eget iaculis integer nam sit in.
          Orci sed auctor pharetra placerat cras integer vitae.
          <a className="text-colYellow" href="#">Трекинг посылок</a>
        </p>
      </div>
    </div>
  );
};

export default Services;
