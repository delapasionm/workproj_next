import { Table } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { API, graphqlOperation} from 'aws-amplify';
import { listUsers } from '../../graphql/queries';
import { onCreateUser } from '../../graphql/subscriptions';
import { UserContext } from '../components/UserContext';

export default function CustomTable() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  
 useEffect(() => {
    getData();
    updateData();
  }, []);

  const getData = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listUsers,
        {
          limit: 500
        }));
      const users = response.data.listUsers.items;
      //console.log(users);
      setUsers(users);
      setError(null);
      
    } catch (err: any) {
      setError(err.message);
      setUsers(null);
    } finally {
      setLoading(false);
    }
  };

  const updateData = () => {
    try {
      API.graphql({
        query: onCreateUser
      }
      ).subscribe({
        next: (createUser) => { 
          setUsers(createUser.value.data);
          console.log(createUser);
         }
      });
      setError(null);
    }catch (err: any) {
      setError(err.message);
      setUsers(null);
    } finally {
      setLoading(false);
    }
  };

  const rows =users && users.map((users: any) => (
    <tr key={users.id}>
      <td>{users.username}</td>
      <td>{users.email}</td>
      <td>{users.createdAt}</td>
      <td>{users.updatedAt}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        {loading && <p>A moment please...</p>}
        {error && (
          <p>{`There is a problem fetching the post data - ${error}`}</p>
        )}
        {rows}
      </tbody>
    </Table>
  );
}

