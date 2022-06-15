// import { IPost } from '@typess/postType';
import { axiosInstance } from '@api/axiosInstance';
import { ISinglePost } from '@typess/postWithComs';
import { TPost } from '@typess/rawPost';
import { Button, notification } from 'antd';
import { Formik } from 'formik';
import { Form, FormItem, Input } from 'formik-antd';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

// import { useMutatePost } from '../api/useMutatePost';

type TProps = {
  close: () => void;
  post?: ISinglePost;
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
const PostUpdateForm = ({ close, post }: TProps) => {
  const queryClient = useQueryClient();
  return (
    <div className="w-full p-2">
      <h3 className="text-lg font-bold">Update the Post</h3>
      <Formik
        initialValues={{ body: post?.body, title: post?.title } as TPost}
        onSubmit={async (values, { resetForm }) => {
          const result = await axiosInstance.put(`posts/${post?.id}`, JSON.stringify(values));
          if (result.status === 200) {
            notification['success']({
              description: 'The post has been updated',
              message: 'Success',
            });
            queryClient.refetchQueries(['aPost', { id: post?.id }]);
            resetForm();
            close();
          }
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

export default PostUpdateForm;
