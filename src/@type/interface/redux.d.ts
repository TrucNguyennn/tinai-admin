interface IAuth {
  isLogin: boolean;
  admin: IAdmin;
}

interface IUserBasic {
  id: string;
  email: string;
  avatar: string;
  name: string;
  birthday: Date;
  createAt: Date;
  updateAt: Date;
  isBlock: boolean;
  isVerify: boolean;
}

interface IPurpose {
  id: string;
  title: string;
  description: string;
  image: string;
}
