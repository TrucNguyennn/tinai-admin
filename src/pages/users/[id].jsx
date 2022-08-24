import User from '../../containers/User';
import Title from '../../components/Title';
import { DarkModeContextProvider } from '@/context/DarkModeContext';
import Layout from '@/components/Layout';

const UserPage = () => {
  return (
    <DarkModeContextProvider>
      <Layout>
        <div>
          <Title title={'Customer - John Smith'} />
          <User />
        </div>
      </Layout>
    </DarkModeContextProvider>
  );
};

export default UserPage;
