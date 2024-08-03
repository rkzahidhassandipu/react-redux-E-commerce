import React, { useEffect } from 'react'
import './SearchPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searhSlice';



const SearchPage = () => {
  const dispatch = useDispatch();
  const {searchTerm} = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus)

  useEffect(() => {
    dispatch(fetchAsyncSearchProduct(searchTerm));
  }, [searchTerm]);

  if(searchProducts.length === 0){
    <h1>Empty Cart</h1>
  }
  

  
  return (
    <div className='search-content bg-whitesmoke'>
      <div className='container'>
        <div className='py-5'>
          <div className='title-md'>
            <h3>Search results: </h3>
          </div>
          <br />
          {
            searchProductsStatus === STATUS.LOADING ? 
            <Loader /> : <ProductList products={searchProducts} />
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage