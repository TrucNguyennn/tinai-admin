import { useAppDispatch } from '@/redux';
import { Spin, Modal, message } from 'antd';
import { FC } from 'react';
import { updatePurpose } from '@/redux/slice/purposeSlice';
import { IResponse } from '@/@type/interface/response';
import Purpose from './Purpose';

const PurposeUpdateModel: FC<IPurposeUpdateModelComponent> = ({
  purpose,
  isVisible,
  onCancel,
  onOk,
}) => {
  const dispatch = useAppDispatch();

  const handleCanCel = () => {
    onCancel();
  };

  const onFinish = async (dto: ICreateUpdatePurpose): Promise<boolean> => {
    const res = (await dispatch(updatePurpose(dto))).payload as IResponse<
      string | IPurpose
    >;

    if (res && res.status) {
      message.success(`Cập nhập thành công.`);
      onOk();
      return true;
    } else {
      message.error(`Cập nhập thất bại`);
      return false;
    }
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isVisible}
      onCancel={handleCanCel}
      footer={null}
    >
      {purpose ? (
        <Purpose purpose={purpose} onSubmit={onFinish} />
      ) : (
        <Spin size="large" />
      )}
    </Modal>
  );
};

export default PurposeUpdateModel;
