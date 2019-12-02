import React from 'react';
import { Table } from 'antd';
import SmartSearch from '../SmartSearch';
import IMovie from '../../interfaces/IMovie';
import { ColumnProps } from 'antd/lib/table';

interface IProps {
  movies: IMovie[];
  columns: ColumnProps<IMovie>[];
}

const SmartTable = (props: IProps) => {
  const [state, setState] = React.useState({
    filteredMovies: props.movies
  });

  const handleChangeSearch = (s: string) => {
    s = s.toLowerCase();
    console.log(s);

    if (s.length === 0) {
      console.log('clearing');
      setState({ ...state, filteredMovies: props.movies });
      return;
    }
    const foundMovies = props.movies.filter(x => {
      const found = x.title.toLowerCase().includes(s);
      console.log(x.title.toLowerCase());
      return found;
    });
    console.log(foundMovies.map(x => x.title));
    setState({ ...state, filteredMovies: foundMovies });
  };

  return (
    <>
      <SmartSearch onChange={handleChangeSearch} />
      <Table dataSource={state.filteredMovies} columns={props.columns} />
    </>
  );
};

export default SmartTable;
