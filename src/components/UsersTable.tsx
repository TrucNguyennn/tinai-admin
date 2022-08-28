import React from 'react';
import { Image, Table, Tag, Button, Space, Modal, message } from 'antd';
import Link from 'next/link';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppSelector, RootState, useAppDispatch } from '@/redux';
import { getAge } from '@/utils';
import { blockUser, unblockUser } from '@/redux/slice/usersSlice';
import { IResponse } from '@/@type/interface/response';

const { confirm } = Modal;

const UsersTable = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state: RootState) => {
    const result = [];
    for (let i = 0; i < state.usersSlice.length; i++) {
      result.push({
        ...state.usersSlice[i],
        key: state.usersSlice[i].id,
        age: getAge(state.usersSlice[i].birthday),
      });
    }
    return result;
  });

  const hanbleBlock = (id: string) => {
    confirm({
      title: `Bạn có chắc muốn xóa người dùng này?`,
      icon: <ExclamationCircleOutlined />,
      content: `Thông tin về người dùng này sẽ bị xóa khỏi kho dữ liệu của bạn.`,
      okText: `Có`,
      okType: `danger`,
      cancelText: `Không`,
      async onOk() {
        const res = (await dispatch(blockUser(id)))
          .payload as IResponse<string>;
        if (res && !res.status) {
          message.error(`Block user fail.`);
        }
      },
      onCancel() {
        console.log(`Cancel`);
      },
    });
  };

  const handleUnblock = async (id: string) => {
    const res = (await dispatch(unblockUser(id))).payload as IResponse<string>;
    if (res && !res.status) message.error(`Unblock user fail`);
  };

  const columns = [
    {
      title: `STT`,
      dataIndex: `id`,
      key: `id`,
      render: (value: any, item: any, index: number) => index + 1,
    },
    {
      title: `Avatar`,
      key: `user`,
      render: (row: any) => {
        return (
          <div style={{ display: `flex`, gap: `20px`, alignItems: `center` }}>
            <Image
              src={row.avatar || `/assets/default.png`}
              width={50}
              height={50}
              alt={`avatar`}
              fallback={`/assets/default.png`}
              style={{ objectFit: `cover`, borderRadius: `50%` }}
            />
            <p>{row.user}</p>
          </div>
        );
      },
    },
    {
      title: `Email`,
      dataIndex: `email`,
      key: `email`,
    },
    {
      title: `Tuổi`,
      dataIndex: `age`,
      key: `age`,
    },
    {
      title: `Tình trạng`,
      dataIndex: `status`,
      key: `status`,
      render: (text: any, value: IUserBasic) => {
        let color = `green`;
        let content = `Khả dụng`;

        if (value.isBlock) {
          color = `volcano`;
          content = `Đã chặn`;
        } else if (!value.isVerify) {
          color = `yellow`;
          content = `Chưa xác thực`;
        }

        return <Tag color={color}>{content.toUpperCase()}</Tag>;
      },
    },
    {
      title: `Hành động`,
      key: `action`,
      render: (value: IUserBasic) => {
        return (
          <Space>
            <Button>
              <Link href={`/users/${value.id}`}>Xem</Link>
            </Button>
            {!value.isBlock && value.isVerify && (
              <Button onClick={() => hanbleBlock(value.id)} danger>
                Chặn
              </Button>
            )}
            {value.isBlock && value.isVerify && (
              <Button onClick={() => handleUnblock(value.id)}>Bỏ chặn</Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={{
          total: users.length,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [`5`, `10`, `20`, `30`],
        }}
        loading={users.length === 0}
        columns={columns}
        dataSource={users}
      />
    </div>
  );
};

export default UsersTable;
