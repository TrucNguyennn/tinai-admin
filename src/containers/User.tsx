import { getAge } from '@/utils';
import {
  ConvertGenderEnum,
  ConvertMaritalStatusEnum,
} from '@/utils/convertToVietnamese';
import pickColor from '@/utils/pickColor';
import { Tag } from 'antd';
import { Image } from 'antd';
import { FC } from 'react';

const User: FC<IUserDetailComponent> = ({ user }) => {
  return (
    <section className={`user`}>
      <div className={`user__content-container`}>
        <main className={`user-profile`}>
          {/*top*/}
          <div className={`top`}>
            <article className={`profile`}>
              <h1 className={`info`}>THÔNG TIN</h1>
              <div className="item">
                <Image
                  className={`image`}
                  src={user.avatar || `/assets/default.png`}
                  alt="avatar"
                  fallback={`/assets/default.png`}
                />
                <div className="item__details">
                  <h1 className="title">{user.name}</h1>

                  <div className="detail">
                    <span className={`key`}>Email: </span>
                    <span className="value">{user.email}</span>
                  </div>

                  <div className="detail">
                    <span className={`key`}>Số điện thoại: </span>
                    <span className="value">{user.phone}</span>
                  </div>

                  <div className="detail">
                    <span className={`key`}>Giới tính: </span>
                    <span className="value">
                      {ConvertGenderEnum(user.gender)}
                    </span>
                  </div>

                  <div className="detail">
                    <span className={`key`}>Tuổi: </span>
                    <span className="value">{getAge(user.birthday)}</span>
                  </div>

                  <div className="detail">
                    <span className={`key`}>Tình trạng hôn nhân: </span>
                    <span className="value">
                      {ConvertMaritalStatusEnum(user.maritalStatus)}
                    </span>
                  </div>

                  <div className="detail">
                    <span className={`key`}>Sở thích: </span>
                    <span className="value">
                      {user.hobbies.length !== 0
                        ? user.hobbies.map((hobby, index) => (
                            <Tag key={hobby.id} color={pickColor(index)}>
                              {hobby.name}
                            </Tag>
                          ))
                        : `Không có`}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {user.album.map((image) => (
                  <Image
                    style={{ objectFit: `cover`, padding: `3px` }}
                    key={image.id}
                    src={image.url}
                    alt={`album`}
                    width={150}
                    height={150}
                  />
                ))}
              </div>
            </article>
          </div>
        </main>
      </div>
    </section>
  );
};

export default User;
