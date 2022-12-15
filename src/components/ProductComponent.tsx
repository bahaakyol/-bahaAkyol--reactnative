import React from 'react'
import {View, Text, Image, Pressable, StyleSheet} from 'react-native'
import {SharedElement} from 'react-navigation-shared-element'

interface ProductProps {
    id: number,
    category: string,
    name: string,
    price: number,
    img: string,
    onPress: () => void
}

const Product: React.FC<ProductProps> = ({
    id,
    name,
    price,
    img,
    onPress
}) => {

    if (img.includes('https://') == false) {
        img = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
    }



    return (

        <View style={styles.containProd}>
            <Pressable style={styles.flex} onPress={onPress}>
                <SharedElement id={id.toString()}>
                    <Image
                        source={{ uri: img }}
                        style={styles.sharedImg}
                        resizeMode='cover'
                    />
                </SharedElement>
            </Pressable>
            <View style={styles.priceView}>
                <Text numberOfLines={1} style={styles.nameText}> {name} </Text>
                <Text style={styles.priceText}> ${price} </Text>
            </View>
        </View>
    )
    }


const styles = StyleSheet.create({
    containProd: {
        height: 150,
        width: 150,
        backgroundColor: 'black',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    flex: { flex: 1 },
    sharedImg: {
        height: '100%',
        width: '100%'
    },
    priceView: { width: 'auto', height: 50 },
    nameText: { fontSize: 12, color: 'white' },
    priceText: { marginLeft: 'auto', marginTop: 'auto', fontSize: 14, color: 'white' },
})

export default Product