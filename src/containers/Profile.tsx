import { IResponse } from '@/@type/interface/response';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { updateAdmin } from '@/redux/slice/authSlice';
import { Avatar, Button, Form, Image, Input, message, Spin } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const Profile = () => {
  const admin: IAdmin = useAppSelector(
    (state: RootState) => state.authSlice.admin,
  );

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState(``);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      avatar: admin.avatar,
      name: admin.name,
      email: admin.email,
      username: admin.username,
    });
  }, [form, admin]);

  const handleImageClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (
        !file ||
        (file.type !== `image/png` &&
          file.type !== `image/jpg` &&
          file.type !== `image/jpeg` &&
          file.type !== `image/svg+xml`)
      ) {
        message.error(`Only accept png, jpeg, jpg, svg file`);
        return;
      }
      setImage(file);
      setAvatarUrl(URL.createObjectURL(file));
      form.setFieldValue(`avatar`, URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: any) => {
    setIsSubmit(true);

    const formData = new FormData();

    if (image) {
      formData.append(`file`, image);
    }

    formData.append(`email`, values.email);
    formData.append(`name`, values.name);

    const res = (await dispatch(updateAdmin(formData))).payload as IResponse<
      string | IAdmin
    >;

    if (res && res.status) {
      setImage(undefined);
      message.success(`Cập nhập thông tin thành công.`);
    } else {
      message.error(`Cập nhập thông tin thất bại.`);
    }

    setIsSubmit(false);
  };

  return admin ? (
    <div className={`users`}>
      <div className={`users__content-container`}>
        <main className={`users__table-container`}>
          <div className={`users__table-container-top`}>
            <div className="table-title">Cá nhân</div>
          </div>
          <div>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                avatar: admin.avatar,
                username: admin.username,
                email: admin.email,
                name: admin.name,
              }}
            >
              <Form.Item
                label="Avatar"
                name="avatar"
                rules={[{ required: true, message: `Vui lòng Chọn avatar!` }]}
              >
                <>
                  <Avatar
                    onClick={handleImageClick}
                    size={100}
                    src={
                      <Image
                        src={avatarUrl || admin.avatar || `/assets/default.png`}
                        alt={`avatar`}
                        fallback={`/assets/default.png`}
                        preview={false}
                      />
                    }
                  />
                  <input
                    type="file"
                    hidden
                    ref={inputFileRef}
                    onChange={handleInputFileChange}
                    accept="image/png, image/jpeg, image/jgp, image/svg+xml"
                  />
                  <Input hidden />
                </>
              </Form.Item>
              <Form.Item label="Tài khoản" name="username">
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[{ required: true, message: `Vui lòng nhập họ tên!` }]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: `Vui lòng nhập email!` },
                  {
                    type: `email`,
                    message: `Email không đúng định dạng.`,
                  },
                ]}
              >
                <Input />
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

export default Profile;
