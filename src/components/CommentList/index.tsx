import React from 'react';
import { Comment, List } from 'antd';

interface ICommentListProps {
  comments: any[];
}

const CommentList = (props: ICommentListProps) => (
  <List
    dataSource={props.comments}
    header={`${props.comments.length} ${
      props.comments.length > 1 ? 'replies' : 'reply'
    }`}
    itemLayout='horizontal'
    renderItem={itemProps => <Comment {...itemProps} />}
  />
);

export default CommentList;
