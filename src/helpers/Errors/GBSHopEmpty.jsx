import noProduct from '../../assets/gb-shop/images/no-product.svg';

const GBSHopEmpty = ({ title, desc }) => {
  return (
    <div className='py-4 text-center'>
      <img className='w-32 mx-auto pb-2' src={noProduct} alt='*' />
      <h1 className='font-medium text-xl'>{title}</h1>
      <p className='opacity-50 text-base'>{desc}</p>
    </div>
  );
};

export default GBSHopEmpty;
