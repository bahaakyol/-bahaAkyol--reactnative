import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'


interface CategoryFlatItemProps {
    handlePress: (item: any) => void
    selected: boolean
    item: any
}


const CategoryFlatItem: React.FC<CategoryFlatItemProps> = ({ handlePress, selected, item }) => {

    return (
        <Pressable onPress={() => handlePress(item)}
            style={[styles.pressable, { backgroundColor: selected ? 'white' : 'black', }]}>
            <Text style={{
                margin: 5, color: selected ? 'black' : 'white', alignSelf: 'center'
            }}>{item.name}</Text>
        </Pressable>
    )
}

export default CategoryFlatItem

const styles = StyleSheet.create({

    pressable:
    {
        width: 100,
        height: 30,
        borderWidth: 2,
        margin: 5,
        borderColor: 'black',
        justifyContent: 'center',
        borderRadius: 10
    },


})