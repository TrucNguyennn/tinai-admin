import User from '../../../containers/User';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usersApi from '@/services/users.api';
import { message, Spin } from 'antd';
import styleScss from './UserDetail.module.scss';
import Title from '@/components/Title';

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [user, setUser] = useState<IUserDetail>();

  const fetchData = async (id: string) => {
    if (id) {
      const res = await usersApi.getUserDetail(id);
      if (!res.status) {
        message.error(`Get user detail fail`);
      } else {
        const userData = res.data as IUserDetail;
        userData.birthday = new Date(userData.birthday);
        setUser(userData);
      }
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  console.log(`user`, user);
  return (
    <Layout>
      <div>
        <Title title={`Người dùng - ${user?.name}`} />
        {user ? (
          <User user={user} />
        ) : (
          <div className={styleScss.userDetail}>
            <Spin size="large" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserPage;
