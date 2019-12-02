import React, { useContext } from 'react';
import { FirebaseContext } from '../infra/firebase';
import IMovie from '../interfaces/IMovie';
import SmartTable from '../components/SmartTable';
import { useList } from 'react-firebase-hooks/database';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const fireContext = useContext(FirebaseContext);
  const [value, loading, error] = useList(
    // @ts-ignore
    fireContext.fire.database().ref('movies')
  );

  const columns: ColumnProps<IMovie>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: item => {
        return (
          <Link to={{ pathname: '/comment/' + item, state: { id: item } }}>
            {item}
          </Link>
        );
      }
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue'
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating'
    },
    {
      title: 'Genres',
      dataIndex: 'genre',
      key: 'genre',
      render: item => {
        return item.toString();
      }
    }
  ];

  const getMovies = (value: any) => {
    let returnData = value.map((row: any, index: number) => {
      const data = row.val();
      data.key = index;
      return data;
    });

    return returnData.slice(0, 1000);
  };
  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>List: Loading...</span>}
      {!loading && value && (
        // @ts-ignore
        <SmartTable movies={getMovies(value)} columns={columns} />
      )}
    </div>
  );
};

export default IndexPage;
