import { FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styleScss from './SignIn.module.scss';
import Image from 'next/image';
import authApi from '@/services/auth.api';
import axiosApiCall from '@/utils/api';
import { Method } from '@/@type';
import axios from 'axios';
import { useAppDispatch } from '@/redux';
import { Login } from '@/redux/slice/authSlice';
import { IResponse } from '@/@type/interface/response';
import { useRouter } from 'next/router';

const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const res = (
      await dispatch(
        Login({ username: values.username, password: values.password }),
      )
    ).payload as IResponse<string>;

    if (!res || !res.status) {
      message.error(`Đăng nhập thất bại`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <div className={styleScss.signIn}>
      <div className={styleScss.signIn__title}>Tinai</div>
      <Form
        name="normal_login"
        className={styleScss.signIn__formSignIn}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: `Please input your Username!` }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: `Please input your Password!` }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styleScss.signIn__button}
          >
            Log in
          </Button>
        </Form.Item>
        <Image
          src="https://cdn.animaapp.com/projects/627cd4a5479f28105826bd8f/releases/629341b88f4f77688a0b54d3/img/illustrationlogin-1@2x.png"
          alt="image"
          width={242}
          height={211}
        />
      </Form>
    </div>
  );
};

export default SignIn;
