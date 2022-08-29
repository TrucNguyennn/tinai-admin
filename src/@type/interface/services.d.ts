interface ILogin {
  username: string;
  password: string;
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

interface ICreateUpdatePurpose {
  id?: string;
  title?: string;
  description?: string;
  file?: File;
}

interface IAdmin {
  id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
}

interface ISetting {
  id: string;
  createdAt: string;
  radius: number;
  updatedAt: string;
}

interface IPageOption {
  page: number;
  limit: number;
}
