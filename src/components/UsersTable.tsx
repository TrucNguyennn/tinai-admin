import { IResponse } from '@/@type/interface/response';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  blockUser,
  getAllUsersBasic,
  unblockUser,
  deleteUser,
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

import { useRouter } from 'next/router';
import { useState } from 'react';

const { confirm } = Modal;

const UsersTable = () => {
  const router = useRouter();
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
      okText: `Có`,
      okType: `danger`,
      cancelText: `Không`,
      async onOk() {
        const res = (await dispatch(blockUser(id)))
          .payload as IResponse<string>;
        if (!res || (res && !res.status))
          message.error(`Chặn thất bại. Vui lòng thử lại sau`);
        else message.success(`Chặn ngưởi dùng thành công.`);
      },
      onCancel() {
        console.log(`Cancel`);
      },
    });
  };

  const hanbleDelete = (id: string) => {
    confirm({
      title: `Bạn có chắc muốn xóa người dùng này?`,
      icon: <ExclamationCircleOutlined />,
      content: `Thông tin về người dùng này sẽ bị xóa và không thể tiếp tục sử dụng ứng dụng.`,
      okText: `Có`,
      okType: `danger`,
      cancelText: `Không`,
      async onOk() {
        const res = (await dispatch(deleteUser(id)))
          .payload as IResponse<string>;
        if (!res || (res && !res.status)) {
          message.error(`Xóa thất bại. Vui lòng thử lại sau`);
        } else message.success(`Xoá ngưởi dùng thành công.`);
      },
      onCancel() {
        console.log(`Cancel`);
      },
    });
  };
  const handleUnblock = async (id: string) => {
    const res = (await dispatch(unblockUser(id))).payload as IResponse<string>;
    if (!res || (res && !res.status))
      message.error(`Bỏ chặn thất bại. Vui lòng thử lại sau`);
    else message.success(`Bỏ chặn ngưởi dùng thành công.`);
  };

  const handlePaginateChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    if (limitPage !== pageSize) {
      setLimitPage(pageSize);
      setCurrentPage(1);
    }
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
    if (!result || (result && !result.status)) {
      message.error(`Không thể lấy dữ liệu. Vui lòng thử lại sau.`);
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
            <Button onClick={() => router.push(`/users/${value.id}`)}>
              Xem
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => hanbleDelete(value.id)}
            >
              Xóa
            </Button>
            {!value.isBlock && value.isVerify && (
              <Button
                onClick={() => hanbleBlock(value.id)}
                type="dashed"
                danger
              >
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
