import NewUser from '../../../containers/NewUser';
import Layout from '@/components/Layout';
import Title from '@/components/Title';

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
