import PurposesTable from '@/components/PurposeTable';
import { useState } from 'react';
import PurposeCreateModel from './PurposeCreateModal';

const Purposes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={`users`}>
      <div className={`users__content-container`}>
        <main className={`users__table-container`}>
          <div className={`users__table-container-top`}>
            <div className="table-title">Mục đích</div>
            <div className={`button`} onClick={showModal}>
              Thêm mới
            </div>
          </div>
          <PurposesTable />
          <PurposeCreateModel
            isVisible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          />
        </main>
      </div>
    </div>
  );
};

export default Purposes;
