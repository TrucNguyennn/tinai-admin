import Users from '../../containers/Users';
import Layout from '@/components/Layout';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { useEffect } from 'react';
import { getAllUsersBasic } from '@/redux/slice/usersSlice';
import { IResponse } from '@/@type/interface/response';
import { message } from 'antd';
import Title from '@/components/Title';

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.usersSlice);

  const fetchData = async () => {
    if (users.length === 0) {
      const res = (await dispatch(getAllUsersBasic())).payload as IResponse<
        IUserBasic[]
      >;

      if (!res.status) {
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
        <Title title={`Customers`} />
        <Users />
      </div>
    </Layout>
  );
};

export default UsersPage;
