import Products from '../../containers/Products';
import Layout from '@/components/Layout';
import Title from '@/components/Title';

const ProductsPage = () => {
  return (
    <Layout>
      <div>
        <Title title={`Products`} />
        <Products />
      </div>
    </Layout>
  );
};

export default ProductsPage;
