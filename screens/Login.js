import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const Login = () => {
  const [userName, setUserName] = useState('User Name');
  const [password, setPassword] = useState('Password');
  const [error, setError] = useState();
  const handleSubmit = () => {
    fetch('/api/v1/user/login', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          this.setState({error: data.error});
          this.props.history.push('/');
        }
        if (Object.prototype.hasOwnProperty.call(data, 'token')) {
          localStorage.setItem('token', data.token);
          this.props.history.push('/stops');
        }
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.bigText}>Delivery Inc.</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
          placeholder="User Name"
        />
        <TextInput
          style={styles.input}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder="Password"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 150,
  },
  textContainer: {
    marginTop: 15,
  },
  bigText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    marginTop: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
  },
  button: {
    width: 120,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
