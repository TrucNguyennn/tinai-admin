import { IResponse } from '@/@type/interface/response';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { updateSetting } from '@/redux/slice/settingSlice';
import { Button, Form, InputNumber, message, Spin } from 'antd';
import { useState } from 'react';

const Settings = () => {
  const disaptch = useAppDispatch();
  const setting = useAppSelector((state: RootState) => state.settingSlice);

  const [isSubmit, setIsSubmit] = useState(false);

  const handleFinish = async (values: any) => {
    setIsSubmit(true);
    const radius = parseInt(values.radius);

    const res = (await disaptch(updateSetting(radius))).payload as IResponse<
      string | ISetting
    >;

    if (res && res.status) {
      message.success(`Cập nhập thành công.`);
    } else {
      message.error(`Cập nhập thất bại.`);
    }

    setIsSubmit(false);
  };

  return setting.id ? (
    <div className={`users`}>
      <div className={`users__content-container`}>
        <main className={`users__table-container`}>
          <div className={`users__table-container-top`}>
            <div className="table-title">Cài đặt</div>
          </div>
          <div>
            <Form
              onFinish={handleFinish}
              layout={`inline`}
              initialValues={{ radius: setting.radius }}
            >
              <Form.Item
                label="Bán kính tìm bạn"
                name="radius"
                rules={[
                  { required: true, message: `Vui lòng nhập đủ thông tin` },
                ]}
              >
                <InputNumber min={1} max={20} addonAfter="km" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Xong
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
};

export default Settings;
