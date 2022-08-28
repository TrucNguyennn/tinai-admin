interface ILayout {
  children?: JSX.Element;
}

interface ITitle {
  title: string;
}

interface IUserDetailComponent {
  user: IUserDetail;
}

interface IPurposeUpdateModelComponent {
  purpose: IPurpose | undefined;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

interface IPurposeCreateModelComponent {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

interface IPurposeComponent {
  purpose: IPurpose;
  onSubmit: (data: ICreateUpdatePurpose) => Promise<boolean>;
}
