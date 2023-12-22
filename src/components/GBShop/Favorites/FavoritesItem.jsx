import { useEffect, useState } from 'react';
import { ItemsCard } from '../..';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { useSelector } from 'react-redux';
import { fetchFavoriteItems } from '../../../api/gb-shop/items';

const FavoritesItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favItems, setFavItems] = useState([]);

  const { userID } = useSelector((state) => state?.user);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = fetchFavoriteItems(userID, (favData) => {
      setFavItems(favData);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [userID]);

  return (
    <>
      {isLoading ? (
        <ContentLoading extraStyle={380} />
      ) : favItems?.length ? (
        <div className='grid grid-cols-5 gap-7 container pt-4'>
          {favItems?.map((el) => (
            <ItemsCard key={el?.id} el={el} favorite={true} />
          ))}
        </div>
      ) : (
        <div className='pt-20'>
          <GBSHopEmpty
            title='Вы еще ничего не сохранили!'
            desc='Сохраните понравившийся товар в разделе GB-Shop.'
          />
        </div>
      )}
    </>
  );
};

export default FavoritesItem;
