import { useAppDispatch } from '@/redux';
import { Modal, message } from 'antd';
import { FC } from 'react';
import { createPurpose } from '@/redux/slice/purposeSlice';
import { IResponse } from '@/@type/interface/response';
import Purpose from './Purpose';

const PurposeCreateModel: FC<IPurposeCreateModelComponent> = ({
  isVisible,
  onCancel,
  onOk,
}) => {
  const purpose: IPurpose = {
    id: ``,
    title: ``,
    description: ``,
    image: ``,
  };

  const dispatch = useAppDispatch();

  const handleCanCel = () => {
    onCancel();
  };

  const onFinish = async (dto: ICreateUpdatePurpose): Promise<boolean> => {
    const res = (await dispatch(createPurpose(dto))).payload as IResponse<
      string | IPurpose
    >;

    if (res.status) {
      message.success(`Thêm mới thành công.`);
      onOk();
      return true;
    } else {
      message.error(`Thêm mới thất bại`);
      return false;
    }
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isVisible}
      onCancel={handleCanCel}
      footer={null}
      destroyOnClose={true}
    >
      <Purpose purpose={purpose} onSubmit={onFinish} />
    </Modal>
  );
};

export default PurposeCreateModel;
