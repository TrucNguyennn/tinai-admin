interface ILogin {
  username: string;
  password: string;
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

interface IUserImages {
  id: string;
  url: string;
  isFavorite: boolean;
}

interface IUserHobbies {
  id: string;
  name: string;
}

interface IUserDetail {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  birthday: Date;
  gender: string;
  description: string;
  children: number;
  alcohol: string;
  religion: string;
  purposeId: string;
  height: number;
  maritalStatus: string;
  education: string;
  isBlock: boolean;
  isVerify: boolean;
  album: IUserImages[];
  hobbies: IUserHobbies[];
}

interface IPurpose {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ICreateUpdatePurpose {
  id?: string;
  title?: string;
  description?: string;
  file?: File;
}
