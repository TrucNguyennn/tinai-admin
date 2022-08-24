import Products from '../../containers/Products';
import Title from '../../components/Title';
import Layout from '@/components/Layout';

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
