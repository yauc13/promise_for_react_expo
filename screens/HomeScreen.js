import React, {useState, useContext} from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

import {UsersContext} from '../context/UsersContext'

export default function HomeScreen() {
  const [ name, setName ] = useState(null);

  const usersContext = useContext(UsersContext)
  const { users, addNewUser } = usersContext;

  const insertUser = () => {
    addNewUser(name)
  }

  return (
    <View style={styles.container}>
      <Text>Our list of users</Text>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}

      <TextInput
        style= { styles.input }
        onChangeText={(name) => setName(name)}
        value={name}
        placeholder="enter new name..."
      />
      <Button title="insert user" onPress={insertUser}/>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    padding: 10,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
