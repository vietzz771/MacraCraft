import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addProduct } from '@/redux/actions/productActions';
import firebase from 'firebase';
const ProductForm = lazy(() => import('../components/ProductForm'));

const AddProduct = () => {
  useScrollTop();
  useDocumentTitle('Add New Product | MacraCraft');
  const isLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (product) => {
    dispatch(addProduct(product));
  };

  const [categories, setCategory] = useState([]);
  const getCategories = () => {
    const categories = [];
    const allCate = [];
    firebase.firestore().collection('categories')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          categories.push({
            name: doc.data().name,
          })
        });
        categories.forEach(category => {
          allCate.push(category.name)
        });
        setCategory(allCate);
      })
      .catch(function (err) {
        console.error("Error getting document:", err)
      })
  }
  useEffect(() => {
    console.log(firebase.firestore().collection('categories').get());
    getCategories();
  }, [])
  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <Suspense fallback={(
        <div className="loader" style={{ minHeight: '80vh' }}>
          <h6>Loading ... </h6>
          <br />
          <LoadingOutlined />
        </div>
      )}
      >
        <ProductForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          product={{
            name: '',
            brand: '',
            price: 0,
            maxQuantity: 0,
            description: '',
            keywords: [],
            sizes: [],
            image: '',
            isFeatured: false,
            isRecommended: false,
            availableColors: [],
            imageCollection: []
          }}
          category={categories}
        />
      </Suspense>
    </div>
  );
};

export default withRouter(AddProduct);
