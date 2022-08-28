import { Button, Form, Image, Input, message } from 'antd';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

const { TextArea } = Input;

const Purpose: FC<IPurposeComponent> = ({ purpose, onSubmit }) => {
  const [form] = Form.useForm();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState(``);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleImageClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (
        !file ||
        (file.type !== `image/png` &&
          file.type !== `image/jpg` &&
          file.type !== `image/jpeg` &&
          file.type !== `image/svg+xml`)
      ) {
        message.error(`Only accept png, jpeg, jpg, svg file`);
        return;
      }
      setImage(file);
      setAvatarUrl(URL.createObjectURL(file));
      form.setFieldValue(`icon`, URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      title: purpose.title,
      description: purpose.description,
      icon: purpose.image,
    });
    setAvatarUrl(``);
    setImage(undefined);
  }, [form, purpose]);

  const onFinish = async (values: any) => {
    setIsSubmit(true);

    const dto: ICreateUpdatePurpose = {
      id: purpose?.id || ``,
      title: values.title,
      description: values.description,
      file: image,
    };

    const res = await onSubmit(dto);
    setIsSubmit(false);
  };

  return (
    <Form
      form={form}
      name="basic"
      preserve={false}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        title: purpose.title,
        description: purpose.description,
        icon: purpose.image,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Icon"
        name="icon"
        rules={[{ required: true, message: `Vui lòng nhập đủ thông tin!` }]}
      >
        <>
          <Image
            src={
              (avatarUrl ? avatarUrl : purpose.image) || `/assets/default.png`
            }
            width={50}
            height={50}
            preview={false}
            alt={`avatar`}
            onClick={handleImageClick}
            style={{ objectFit: `cover`, borderRadius: `50%` }}
          />
          <input
            type="file"
            hidden
            ref={inputFileRef}
            onChange={handleInputFileChange}
            accept="image/png, image/jpeg, image/jgp, image/svg+xml"
          />
          <Input hidden />
        </>
      </Form.Item>

      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: `Vui lòng nhập đủ thông tin!` }]}
      >
        <Input maxLength={100} />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: `Vui lòng nhập đủ thông tin!` }]}
      >
        <TextArea maxLength={200} rows={6} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Purpose;
