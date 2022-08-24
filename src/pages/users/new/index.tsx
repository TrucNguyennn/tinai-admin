import NewUser from '../../../containers/NewUser';
import Title from '../../../components/Title';
import Layout from '@/components/Layout';

const NewUserPage = () => {
  return (
    <Layout>
      <div>
        <Title title={`New User`} />
        <NewUser title={`Add New User`} />
      </div>
    </Layout>
  );
};

export default NewUserPage;
