import React, { useEffect } from 'react';
import './ProductSinglePage.scss'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProductsSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';

const ProductSinglePage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);

  // getting single product
  useEffect(() => {
    dispatch(fetchAsyncProductsSingle(id))
  }, []);

  let discountedPrice = (product?.price) - (product?.price * (product?.discountedPrice / 2));
  if(productSingleStatus === STATUS.LOADING){
    return <Loader />
  }
  
  return (
    <div>ProductSinglePage</div>
  )
}

export default ProductSinglePage