/* eslint-disable react-hooks/exhaustive-deps */
import { IResponse } from '@/@type/interface/response';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import Purposes from '@/containers/Purposes/Purposes';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { getAll } from '@/redux/slice/purposeSlice';
import { message } from 'antd';
import { useEffect } from 'react';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const purposes = useAppSelector((state: RootState) => state.purposeSlice);

  const fetchData = async () => {
    if (purposes.length === 0) {
      const res = (await dispatch(getAll())).payload as IResponse<IUserBasic[]>;

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
        <Title title={`Purpose`} />
        <Purposes />
      </div>
    </Layout>
  );
};

export default ProfilePage;
