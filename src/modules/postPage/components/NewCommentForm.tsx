import { Button } from 'antd';
import { Formik } from 'formik';
import { Form, FormItem, Input } from 'formik-antd';
import * as Yup from 'yup';

import { useMutateComment } from '../api/useMutateComment';

const validationSchema = Yup.object().shape({
  body: Yup.string()
    .min(1, 'Too short for a comment.')
    .max(50, 'Too long for a comment.')
    .required('Required.'),
});

type TProps = {
  close: () => void;
  postId: string | number;
};

const NewCommentForm = ({ close, postId }: TProps) => {
  const postComment = useMutateComment();
  return (
    <div className="w-full p-2">
      <h3 className="text-lg font-bold">Add a Comment</h3>
      <Formik
        initialValues={{ body: '', postId: +postId }}
        onSubmit={(values, { resetForm }) => {
          postComment.mutateAsync(values);
          resetForm();
          close();
        }}
        validationSchema={validationSchema}
      >
        <Form layout="vertical">
          <FormItem label="Add your comment" name="body">
            <Input name="body" placeholder="Comment" suffix={<span />}></Input>
          </FormItem>
          <Button block htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewCommentForm;
