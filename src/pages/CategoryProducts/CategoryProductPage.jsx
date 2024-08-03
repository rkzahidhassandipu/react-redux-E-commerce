import React, { useEffect } from 'react';
import "./CategoryProductPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProDuctsByCategory, fetchAsyncProductsOfCategory, getCategoryProductsStatus } from '../../store/categorySlice';
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProDuctsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    if (category) {
      dispatch(fetchAsyncProductsOfCategory(category));
    }
  }, [dispatch, category]);

  // Handle different loading statuses
  if (categoryProductsStatus === STATUS.LOADING) {
    return <Loader />;
  }

  if (categoryProductsStatus === STATUS.FAILED) {
    return <div>Error loading products</div>;
  }

  return (
    <div className='cat-products py-5 bg-whitesmoke'>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our 
              <span>
              {category ? category.replace("-", " ") : ""}
              </span>
            </h3>
          </div>
          {/* Conditionally render ProductList if there are products */}
          {categoryProducts && categoryProducts.length > 0 ? (
            <ProductList products={categoryProducts} />
          ) : (
            <div>No products available in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;


