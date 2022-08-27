import NewProduct from '../../../containers/NewProduct';
import Layout from '@/components/Layout';
import productsInput from '@/utils/data';
import Title from '@/components/Title';

const NewProductsPage = () => {
  return (
    <Layout>
      <div>
        <Title title={`Add New Product`} />
        <NewProduct title={`Add New Product`} productsInput={productsInput} />
      </div>
    </Layout>
  );
};

export default NewProductsPage;
