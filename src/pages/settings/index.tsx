import { IResponse } from '@/@type/interface/response';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import Settings from '@/containers/Settings';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { getSetting } from '@/redux/slice/settingSlice';
import { message } from 'antd';
import { useEffect } from 'react';

const SettingPage = () => {
  const dispatch = useAppDispatch();
  const idSetting = useAppSelector((state: RootState) => state.settingSlice.id);

  const fetchData = async () => {
    if (!idSetting) {
      const res = (await dispatch(getSetting())).payload as IResponse<
        ISetting | string
      >;
      if (res && res && !res.status) {
        message.error(`Can not get setting data`);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <Title title={`Cài đặt`} />
        <Settings />
      </div>
    </Layout>
  );
};

export default SettingPage;
