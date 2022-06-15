import { TPost } from '@typess/rawPost';
import { Button } from 'antd';
import { Formik } from 'formik';
import { Form, FormItem, Input } from 'formik-antd';
import * as Yup from 'yup';

import { useMutatePost } from '../api/useMutatePost';

type TProps = {
  close: () => void;
};

const validationSchema = Yup.object().shape({
  body: Yup.string()
    .min(3, 'Too short for a description.')
    .max(100, 'Too long for a description.')
    .required('Required.'),
  title: Yup.string()
    .min(3, 'Too short for a title.')
    .max(30, 'Too long for a title')
    .required('Required.'),
});

const CreatePostForm = ({ close }: TProps) => {
  const createPost = useMutatePost();
  return (
    <div className="w-full p-2">
      <h3 className="text-lg font-bold">Create a Post</h3>
      <Formik
        initialValues={{ body: '', title: '' } as TPost}
        onSubmit={(values, { resetForm }) => {
          createPost.mutateAsync(values);
          resetForm();
          close();
        }}
        validationSchema={validationSchema}
      >
        <Form layout="vertical">
          <FormItem label="Post's title" name="title">
            <Input name="title" placeholder="Title" suffix={<span />}></Input>
          </FormItem>
          <FormItem label="Post's description" name="body">
            <Input name="body" placeholder="Description" suffix={<span />}></Input>
          </FormItem>
          <Button block htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePostForm;
