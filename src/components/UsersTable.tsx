import { IResponse } from '@/@type/interface/response';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  blockUser,
  getAllUsersBasic,
  unblockUser,
} from '@/redux/slice/usersSlice';
import { getAge } from '@/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Image,
  message,
  Modal,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
} from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const { confirm } = Modal;

const UsersTable = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state: RootState) => {
    const result = [];
    for (let i = 0; i < state.usersSlice.list.length; i++) {
      result.push({
        ...state.usersSlice.list[i],
        key: state.usersSlice.list[i].id,
        age: getAge(state.usersSlice.list[i].birthday),
      });
    }
    return result;
  });
  const { total, page, limit } = useAppSelector(
    (state: RootState) => state.usersSlice,
  );

  const [currentPage, setCurrentPage] = useState(page + 1);
  const [limitPage, setLimitPage] = useState(limit | 5);
  const hanbleBlock = (id: string) => {
    confirm({
      title: `Bạn có chắc muốn chặn người dùng này?`,
      icon: <ExclamationCircleOutlined />,
      content: `Thông tin về người dùng này sẽ bị chặn và không thể tiếp tục sử dụng ứng dụng.`,
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

  const handlePaginateChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setLimitPage(pageSize);
  };
  const handleTableChange = async (pagination: TablePaginationConfig) => {
    const result = (
      await dispatch(
        getAllUsersBasic({
          page: (pagination.current as number) - 1 ?? 0,
          limit: pagination.pageSize ?? 5,
        }),
      )
    ).payload as IResponse<IUserBasic[]>;
    if (result && !result.status) {
      message.error(`Can not get users data`);
    }
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
  console.log(users.length);

  return (
    <div>
      <Table
        pagination={{
          total: total,
          pageSize: +limitPage,
          current: currentPage,
          defaultPageSize: +limit,
          showSizeChanger: true,
          onChange: handlePaginateChange,
          pageSizeOptions: [`5`, `10`, `20`, `30`],
        }}
        loading={false}
        columns={columns}
        dataSource={users}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default UsersTable;
