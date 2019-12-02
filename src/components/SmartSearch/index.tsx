import React from 'react';
import './index.css';
import { debounce } from 'lodash';

import Search from 'antd/lib/input/Search';

interface IProps {
  onChange: any;
}

export default (props: IProps) => {
  const [state, setState] = React.useState({ value: '' });

  React.useEffect(() => {
    handleChange.cancel(); // On un-mount to remove the debounce fixes error on quick change of page
  });

  const handleChange = debounce((text: string) => {
    doSearch(text);
  }, 1000);

  const doSearch = (text: string) => {
    setState({ ...state, value: text });
    props.onChange(text);
  };

  return <Search className="pageHeading" placeholder="Filter by Title" onChange={e => handleChange(e.target.value)} onSearch={value => doSearch(value)} enterButton />;
};
