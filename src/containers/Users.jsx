import UsersTable from '../components/UsersTable';
import Link from 'next/link';

const Users = () => {
  return (
    <div className={'users'}>
      <div className={'users__content-container'}>
        <main className={'users__table-container'}>
          <div className={'users__table-container-top'}>
            <div className="table-title">Người dùng</div>
          </div>
          <UsersTable />
        </main>
      </div>
    </div>
  );
};

export default Users;
