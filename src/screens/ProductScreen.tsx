import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { SharedElement } from 'react-navigation-shared-element'
import { StatusBar } from 'react-native'

interface ProductScreenProps {
    route: any,
    navigation: any
}
const ProductScreen: React.FC<ProductScreenProps> = ({ route, navigation }) => {
    const name = route.params.name
    const price = route.params.price
    const info = route.params.description
    const avatar = avatarHandler()
    


    function avatarHandler() {
        if (route.params.avatar.includes('https://')) {
            return route.params.avatar
        } else {
            return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
        }
    }

    const id = route.params._id

    return (
        <View style={styles.flexed}>
            <StatusBar backgroundColor='black' barStyle='dark-content' />
            <View style={styles.view}>
                <SharedElement id={id}>
                    <Image
                        resizeMode='cover'
                        source={{ uri: avatar }}
                        style={styles.image}
                    />
                </SharedElement>
            </View>
            <View style={styles.wrapper}>
                <View style={{ flexDirection: 'row', marginTop: '2%', padding: 10 }}>
                    <View style={{ width: '75%' }}>
                        <Text style={styles.text} > {name}</Text>
                    </View>
                    <Text style={[styles.text, { marginLeft: 'auto' }]} > ${price}</Text>
                </View>
                <ScrollView style={{ backgroundColor: 'black', marginTop: 5 }}>
                    <Text style={{ color: 'white', marginTop: 15, padding: 10 }}>{info}</Text>
                </ScrollView>
            </View>

        </View>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    flexed: {
        flex: 1
    },
    view: { backgroundColor: 'grey', flex: 1 },
    image: { width: '100%', height: '100%', },
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
        borderRadius: 15,
    }

})