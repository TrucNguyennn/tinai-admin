import Layout from '@/components/Layout';
import Title from '@/components/Title';
import Profile from '@/containers/Profile';

const ProfilePage = () => {
  return (
    <Layout>
      <div>
        <Title title={`Trang cá nhân`} />
        <Profile />
      </div>
    </Layout>
  );
};

export default ProfilePage;
