import Users from '../../containers/Users';
import Title from '../../components/Title';
import Layout from '@/components/Layout';

const UsersPage = () => {
  return (
    <Layout>
      <div>
        <Title title={`Customers`} />
        <Users />
      </div>
    </Layout>
  );
};

export default UsersPage;
