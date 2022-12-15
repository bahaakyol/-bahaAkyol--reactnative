import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import React, { useLayoutEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity, Keyboard } from 'react-native'
import token from '../../environment'
import axios from 'axios'

const addProduct = ({ navigation, route }: any) => {

  const categories = route?.params?.categories
  const [newPrice, setNewPrice] = React.useState(0)
  const [newCategory, setNewCategory] = React.useState(categories?.[0].name)
  const [newName, setNewName] = React.useState('')
  const [newDescription, setNewDescription] = React.useState('')
  const [newAvatar, setNewAvatar] = React.useState('')

  function onPress() {
    const newObj = {
      name: newName,
      avatar: newAvatar,
      description: newDescription,
      price: newPrice,
      category: newCategory,
      developerEmail: 'bahaakyol@outlook.com'
    }

    if (newName && newAvatar && newDescription && newPrice && newCategory) {
      axios.post("https://upayments-studycase-api.herokuapp.com/api/products",
        newObj, { headers: { 'Authorization': `Bearer ${token}` } }
      ).then(res => {
        Alert.alert(res.data.message)
        navigation.navigate('UPayments Store')
      }).catch(err => {
        Alert.alert(err)
      })
    }
    else{
      Alert.alert('Please properly fill all the fields')
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign name="checkcircle" size={30} color="white"
          style={styles.checkIcon}
          onPress={onPress}
        />
      ),
    })
  }, [navigation, newName, newAvatar, newDescription, newPrice, newCategory])

  return (
    <TouchableOpacity style={styles.touchableOpacity}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <TextInput style={styles.textInput} label="Product title" mode="outlined"
          value={newName} onChangeText={text => setNewName(text)}
        />
        <TextInput style={styles.textInput} label="Price" mode="outlined"
          onChangeText={text => setNewPrice(parseInt(text))}
        />
        <TextInput
          style={[styles.textInput, styles.description]}
          label="Description"
          autoCorrect={false}
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setNewDescription(text)}
        />
        <TextInput style={styles.textInput} label="Image Link" mode="outlined"
          onChangeText={text => setNewAvatar(text)}
        />
        <Text style={styles.categoryText}>Select a Category</Text>
        <Picker
          selectedValue={newCategory}
          onValueChange={(itemValue, itemIndex) => {
            setNewCategory(itemValue)
          }
          }>
          {categories.map((item: { name: string | undefined }, index: React.Key | null | undefined) => {
            return (<Picker.Item label={item.name} value={item.name} key={index} />)
          })}
        </Picker>
      </View>
    </TouchableOpacity>


  )
}

export default addProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    margin: 10,
  },
  touchableOpacity: {
    flex: 1,
  },
  description: {
    height: 100,
    justifyContent: 'flex-start'
  },
  categoryText: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 20
  },
  checkIcon: {
    marginRight: 10
  }

})