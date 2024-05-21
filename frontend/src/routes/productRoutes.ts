
import ProductDetail from '../components/product/ProductDetail.vue';
import ProductLists from '../components/product/ProductLists.vue';

const productRoutes = [
  { 
  path: '/product/product-detail/:id',
  name: 'product-detail',
  component: ProductDetail,
  },
  { path: '/product/product-listes', component: ProductLists  }
];

export default productRoutes;