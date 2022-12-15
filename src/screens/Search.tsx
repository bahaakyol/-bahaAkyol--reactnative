import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native-paper'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { SharedElement } from 'react-navigation-shared-element'

interface SearchProps {
    route: any,
    navigation: any
}

const Search: React.FC<SearchProps> = ({ route, navigation }) => {

    const data = route.params.data
    const placeholder = 'Search for products'
    const [search, setSearch] = React.useState('')
    const [displayedData, setDisplayedData] = React.useState(data)


    useEffect(() => {
        if (search.length > 0) {
            const filteredData = data.filter((item: { name: string }) => item.name.toLowerCase().includes(search.toLowerCase()))
            setDisplayedData(filteredData)
        } else {
            setDisplayedData(data)
        }
    }, [search])

    function onPress(item: any) {

        navigation.navigate({ name: 'Product', params: { ...item } })

    }

    function renderItem({ item }: any): JSX.Element {

        if (item.avatar.includes('https://') == false) {
            item.avatar = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
        }

        return (
            <TouchableOpacity onPress={() => onPress(item)}>
                <View style={styles.sharedWrapper}>
                    <SharedElement id={item._id}>
                        <Image source={{ uri: item.avatar }} style={styles.image} />
                    </SharedElement>
                    <Text
                        numberOfLines={1}
                        style={styles.itemName}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (

        <View style={styles.container}>
            <TextInput
                value={search}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={text => setSearch(text)}
                placeholder={placeholder}
                style={styles.textInput}
            />
            <FlatList
                data={displayedData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>

    )
}

export default Search

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    sharedWrapper: {
        width: '100%',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: 200
    },
    itemName: {
        fontSize: 20,
        fontWeight: '300',
        color: 'black'
    },
    textInput: { backgroundColor: 'white' }

})