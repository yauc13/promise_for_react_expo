import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {UsersContext } from '../context/UsersContext'

export default function UserListScreen() {
  const { users } = useContext(UsersContext)

  return (
    <ScrollView style={styles.container}>
      <Text>Here is our list of users</Text>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
