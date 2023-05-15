import React, {useState} from 'react'
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'

function App(): JSX.Element {
  const [enteredAmount, setEnteredAmount] = useState('')
  const [saldo, setSaldo] = useState(0)
  const [saldoIsVisible, setSaldoIsVisible] = useState(false)

  const switchIsVisibleHandler = () => {
    setSaldoIsVisible(prevState => !prevState)
  }

  const changeSaldoHandler = (action: string) => {
    const amount = parseInt(enteredAmount, 10);
    if (isNaN(amount)) {
      Alert.alert('Erro', 'o montante não é um número inteiro válido');
      return;
    }
    if (action === 'add') {
      setSaldo(prevState => prevState + amount);
    }
    if (action === 'remove') {
      setSaldo(prevState => prevState - amount);
    }
    setEnteredAmount('');
  }

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  }

  const titleStyle = {
    color: isDarkMode ? 'white' : 'black',
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={[titleStyle, styles.titulo]}>Carteira 123</Text>
      <View style={styles.cardContainer}>
        <View style={styles.switchContainer}>
          <Text style={{color: 'white'}}>Seu saldo</Text>
          <Switch onChange={switchIsVisibleHandler} value={saldoIsVisible} />
        </View>
        <Text style={styles.saldo}>R$ {saldoIsVisible ? saldo : '--'}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardAppearance={isDarkMode ? 'light' : 'dark'}
            keyboardType={'number-pad'}
            style={styles.input}
            value={enteredAmount}
            onChangeText={val => setEnteredAmount(val)}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => changeSaldoHandler('remove')}>
            <Text style={styles.buttonText}>Remover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => changeSaldoHandler('add')}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 8,
    backgroundColor: '#2b1150',
    padding: 8,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  saldo: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  inputContainer: {
    // flexDirection: "row",
    // justifyContent: 'center',
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: 48,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
  },
})

export default App;
