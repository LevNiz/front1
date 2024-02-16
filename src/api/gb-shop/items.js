import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
} from '../../redux/slices/itemsSlice';
import {
  fetchFavItemsStart,
  fetchFavItemsSuccess,
  fetchFavItemsFailure,
} from '../../redux/slices/favItemsSlice';
import { request } from '../axios';
import { db } from '../../firebase/firebase';

// Fetch items
export const fetchItems = async (
  dispatch,
  category,
  sizesParam,
  supplierParam,
  costsParam
) => {
  dispatch(fetchItemsStart());
  try {
    const res = await request.get(
      `/core/item/?category=${category || ''}&sizes=${
        sizesParam || ''
      }&supplier=${supplierParam || ''}&${costsParam || ''}`
    );
    dispatch(fetchItemsSuccess(res?.data?.results));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchItemsFailure(error));
  }
};

export const fetchSearchItem = async (dispatch, searchValue, categoryID) => {
  dispatch(fetchItemsStart());
  try {
    let url = `/core/item/?search=${searchValue}&category=${categoryID || ''}`;
    const res = await request.get(url);
    dispatch(fetchItemsSuccess(res?.data?.results));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchItemsFailure(error));
  }
};

export const fetchSortItem = async (dispatch, categoryID, selectedValue) => {
  dispatch(fetchItemsStart());
  try {
    let url;
    if (selectedValue && Object.keys(selectedValue).length > 0) {
      url = `core/item/?gender_type=${
        selectedValue.gender_type || ''
      }&category=${categoryID || ''}&ordering=${selectedValue.ordering || ''}`;
    }
    const res = await request.get(url);
    dispatch(fetchItemsSuccess(res?.data?.results));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchItemsFailure(error));
  }
};

export const fetchItemsNextPage = async (dispatch, next, items) => {
  try {
    const res = await request.get(`${next}`);
    const results = res?.data?.results;
    const moreItems = [...items, ...results];
    dispatch(fetchItemsSuccess(moreItems));
    return { data: res?.data };
  } catch (error) {
    dispatch(fetchItemsFailure(error));
    return { success: false };
  }
};

export const fetchFilterItemsMobile = async (dispatch, category, formData) => {
  const { gender_type, ordering, selectedCosts, selectedBrands } = formData;

  const sizesParam = formData.selectedSizes.join(';');

  const costsParam = selectedCosts
    .map((cost) => `min_cost=${cost.minCost}&max_cost=${cost.maxCost}`)
    .join('&');

  dispatch(fetchItemsStart());
  try {
    const url = `/core/item/?category=${
      category || ''
    }&sizes=${sizesParam}&gender_type=${gender_type?.value || ''}&ordering=${
      ordering?.value || ''
    }&${costsParam}&supplier=${selectedBrands || ''}`;
    const res = await request.get(url);
    dispatch(fetchItemsSuccess(res?.data?.results));
    return { next: res?.data?.next };
  } catch (error) {
    dispatch(fetchItemsFailure(error));
  }
};

// Fetch more items:
export const fetchMoreItems = async (category, page) => {
  try {
    const res = await request.get(
      `/core/item/?page=${page}&category=${category}`
    );
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

// Fetch items detail
export const fetchItemsDetail = async (id) => {
  try {
    const res = await request.get(`/core/item/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

// Fetch Favorite items:
export const fetchFavoriteItems = (userID, dispatch) => {
  dispatch(fetchFavItemsStart());

  const userDocRef = doc(db, 'users', `${userID}`);
  const favCollectionRef = collection(userDocRef, 'favs');

  const unsubscribe = onSnapshot(
    favCollectionRef,
    (snapshot) => {
      const favData = snapshot.docs.map((doc) => doc.data());
      dispatch(fetchFavItemsSuccess(favData));
    },
    (error) => {
      dispatch(fetchFavItemsFailure(error));
    }
  );

  return unsubscribe;
};

// Add item to Favorites using setDoc:
export const addToFavorites = async (userID, el, name, access) => {
  const sendData = {
    category: el?.category?.id || null,
    cost: el?.cost || null,
    costSale: el?.costSale || null,
    description: el?.description || null,
    id: el?.id || null,
    image: el?.image || null,
    imageLink: el?.imageLink || null,
    issale: el?.issale || null,
    name: el?.name || null,
    supplier: el?.supplier || [],
    uid: `${el?.id}` || null,
  };

  const userDocRef = doc(db, 'users', `${userID}`);
  const favsCollectionRef = collection(userDocRef, 'favs');

  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (!docSnapshot.exists()) {
      setDoc(userDocRef, { name: name || null, token: access || null });
    }
  });

  try {
    await setDoc(doc(favsCollectionRef, `${el?.id}`), sendData);
  } catch (error) {
    alert(`Ошибка: ${error}`);
  } finally {
    unsubscribe();
  }
};

// Remove item from Favorites:
export const removeFromFavorites = async (userID, itemID) => {
  try {
    const userDocRef = doc(db, 'users', `${userID}`);
    const favCollectionRef = collection(userDocRef, 'favs');
    const querySnapshot = await getDocs(favCollectionRef);

    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().id === itemID
    );

    if (docToDelete) {
      await deleteDoc(docToDelete.ref);
    }
  } catch (error) {
    alert(`Ошибка: ${error}`);
  }
};
// Filter by supplier:
export const fetchBrandsItem = async (id, page) => {
  try {
    const res = await request.get(`core/item/?page=${page}&supplier=${id}`);
    return { success: true, data: res?.data?.results, count: res?.data?.count };
  } catch (error) {
    return { success: false, data: 'error' };
  }
};

// Fetch similar items:
export const fetchSimilarItems = async (category) => {
  try {
    const res = await request.get(`core/item/?category=${category}`);
    return { similarSuccess: true, similarData: res?.data?.results };
  } catch (error) {
    return { similarSuccess: false, similarData: 'error' };
  }
};
