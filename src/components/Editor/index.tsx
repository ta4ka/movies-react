import React from 'react';
import { Form, Button, Input } from 'antd';
const { TextArea } = Input;

interface IEditorProps {
  onChange: any;
  onSubmit: any;
  submitting: any;
  value: any;
}

const Editor = (props: IEditorProps) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={props.onChange} value={props.value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={props.submitting}
        onClick={props.onSubmit}
        type='primary'
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export default Editor;
