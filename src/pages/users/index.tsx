import Users from '../../containers/Users';
import Layout from '@/components/Layout';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { useEffect } from 'react';
import { getAllUsersBasic } from '@/redux/slice/usersSlice';
import { IResponse } from '@/@type/interface/response';
import { message } from 'antd';
import Title from '@/components/Title';
import { useRouter } from 'next/router';

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.usersSlice);
  const limit = process.env.NEXT_PUBLIC_LIMIT_OPTION as string;

  const fetchData = async () => {
    if (users.list.length === 0) {
      const res = (
        await dispatch(
          getAllUsersBasic({ page: 0, limit: parseInt(limit) ?? 5 }),
        )
      ).payload as IResponse<IUserBasic[]>;
      if (res && !res.status) {
        message.error(`Can not get users data`);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <Title title={`Người dùng`} />
        <Users />
      </div>
    </Layout>
  );
};

export default UsersPage;
