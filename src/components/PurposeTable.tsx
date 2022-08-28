import { IResponse } from '@/@type/interface/response';
import PurposeUpdateModel from '@/containers/Purposes/PurposeUpdateModal';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { deletePurpose } from '@/redux/slice/purposeSlice';
import { Button, Image, message, Modal, Space, Table } from 'antd';
import { useState } from 'react';
const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';

const PurposesTable = () => {
  const dispatch = useAppDispatch();

  const purposes = useAppSelector((state: RootState) => {
    const result = [];
    for (let i = 0; i < state.purposeSlice.length; i++) {
      result.push({
        ...state.purposeSlice[i],
        key: state.purposeSlice[i].id,
      });
    }
    return result;
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [purposeEdit, setPurposeEdit] = useState<IPurpose>();

  const showModal = (id: string) => {
    setIsModalVisible(true);
    setPurposeEdit(purposes.find((item) => item.id === id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id: string) => {
    const res = (await dispatch(deletePurpose(id)))
      .payload as IResponse<string>;
    if (res.status) {
      message.success(`Xóa thành công.`);
    } else {
      message.error(`Xóa thất bại.`);
    }
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: `Bạn có chắc muốn xóa?`,
      icon: <ExclamationCircleOutlined />,
      okText: `Có`,
      okType: `danger`,
      cancelText: `Không`,
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log(`Cancel`);
      },
    });
  };

  const columns = [
    {
      title: `STT`,
      dataIndex: `id`,
      key: `id`,
      render: (value: any, item: any, index: number) => index + 1,
    },
    {
      title: `Icon`,
      key: `icon`,
      render: (row: any) => {
        return (
          <div style={{ display: `flex`, gap: `20px`, alignItems: `center` }}>
            <Image
              src={row.image || `/assets/default.png`}
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
      title: `Tiêu đề`,
      dataIndex: `title`,
      key: `title`,
    },
    {
      title: `Mô tả`,
      dataIndex: `description`,
      key: `description`,
    },
    {
      title: `Hành động`,
      key: `action`,
      render: (value: IPurpose) => {
        return (
          <Space>
            <Button onClick={() => showModal(value.id)}>Chỉnh sửa</Button>
            <Button danger onClick={() => showDeleteConfirm(value.id)}>
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={{
          total: purposes.length,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [`5`, `10`, `20`, `30`],
        }}
        loading={purposes.length === 0}
        columns={columns}
        dataSource={purposes}
      />
      <PurposeUpdateModel
        purpose={purposeEdit}
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default PurposesTable;
