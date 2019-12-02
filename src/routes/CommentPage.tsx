import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { Comment, Avatar } from 'antd';
import moment from 'moment';
import Editor from '../components/Editor';
import CommentList from '../components/CommentList';
import { FirebaseContext } from '../infra/firebase';
import { useList } from 'react-firebase-hooks/database';

interface IProps extends RouteComponentProps<any> {
  match: any;
}

interface IComment {
  author: string;
  avatar: string;
  content: string;
  dateTime: string;
}

const CommentPage = (props: IProps) => {
  const titleName = props.location.state.id;
  const fireContext = useContext(FirebaseContext);

  const [value, loading, error] = useList(
    fireContext.fire
      // @ts-ignore
      .database()
      .ref('comments/' + titleName)
  );

  const [state, setState] = React.useState({
    comments: [] as any[],
    submitting: false,
    text: ''
  });

  React.useEffect(() => {
    if (!loading && value) {
      // set the comments in state when loading is done.
      const comments = value.map(x => x.val());
      setState({
        ...state,
        comments: comments
      });
    }
    // eslint-disable-next-line
  }, [loading]);

  const handleSubmit = () => {
    if (!state.text) {
      return;
    }

    setState({ ...state, submitting: true });
    const newComment = {
      title: titleName,
      author: 'Jon Snow',
      avatar: 'https://sinonjs.org/assets/images/logo.png',
      content: state.text,
      datetime: moment().fromNow()
    };
    state.comments.push(newComment);

    fireContext.fire
      // @ts-ignore
      .database()
      .ref('comments/' + titleName)
      .set(state.comments);

    setState({
      ...state,
      submitting: false,
      text: '',
      comments: state.comments
    });
  };

  const handleChange = (e: any) => {
    setState({ ...state, text: e.target.value });
  };
  const { comments, submitting, text } = state;

  return (
    <div>
      <h2>{titleName}</h2>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Getting Comments...</span>}

      {!loading && comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src='https://sinonjs.org/assets/images/logo.png'
            alt='Jon Snow'
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={text}
          />
        }
      />
    </div>
  );
};

export default CommentPage;
