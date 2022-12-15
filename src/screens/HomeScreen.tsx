import React, { useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CategoryFlatItem from '.././components/CategoryFlatItem'
import Product from '.././components/ProductComponent'
import axios from 'axios'
import token from '../../environment'


interface ProductType {
    name: string
    avatar: string
    description: string
    price: number
    category: string
}

interface CategoryType {
    _id: string
    name: string
}

const HomeScreen = ({ navigation }: any) => {

    const [categories, setCategories] = React.useState<CategoryType[]>([])
    const [prodCategory, setProdCategory] = React.useState('All')
    const [prodData, setProdData] = React.useState<ProductType[]>([])
    const [selected, setSelected] = React.useState<string>("-1")
    const [loading, setLoading] = React.useState<boolean>(true)
    const [refreshing, setRefreshing] = React.useState<boolean>(false)
    const allOption = { _id: '-1', name: 'All' } as CategoryType
    const data1 = [allOption, ...categories]
    const [displayedProducts, setDisplayedProducts] = React.useState<ProductType[]>([])

    async function getAllData(): Promise<void> {
        setLoading(true)
        await getProducts()
        await getCategories()
        setLoading(false)
    }


    async function onRefresh(): Promise<void> {
        setRefreshing(true)
        await getProducts()
        setRefreshing(false)
    }
    async function getCategories(): Promise<void> {

        const response = await axios.get("https://upayments-studycase-api.herokuapp.com/api/categories/",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                // body : {

                // }
            }) as any
        if (response.data.message === 'Success') {
            setCategories(response.data.categories)
        }
    }
    async function getProducts(): Promise<void> {

        const response = await axios.get("https://upayments-studycase-api.herokuapp.com/api/products/",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }) as any
        if (response.data.message === 'Success') {
            setProdData(response.data.products)
        }
    }


    useEffect(() => {
        getAllData()
    }, [])


    function renderProduct({ item }: any): JSX.Element {
        return (
            <Product
                id={item._id}
                onPress={() => productPressed(item)}
                category={item.category}
                name={item.name}
                price={item.price}
                img={item.avatar} />
        )
    }

    function productPressed(item: any): void {
        navigation.navigate({ name: 'Product', params: { ...item } })
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Ionicons name={'search'} size={30} color='black' onPress={searchPressed} />
                )
            }
        })
    }, [navigation, prodData])


    function handlePress(item: any) {
        setSelected(item._id)
        setProdCategory(item.name)
    }

    function plusPressed() {
        navigation.navigate({ name: 'addProduct', params: { categories } })
    }


    function renderItem({ item }: any): JSX.Element {

        return (
            <CategoryFlatItem
                handlePress={handlePress}
                selected={selected === item._id}
                item={item}
            />
        )
    }
    useEffect(() => {
        if (prodCategory == 'All') {
            setDisplayedProducts(prodData)
        }
        else {
            setDisplayedProducts(prodData.filter((item) => item.category === prodCategory))
        }
    }, [prodCategory, prodData])

    function searchPressed() {
        navigation.navigate({ name: 'Search', params: { data: prodData } })
    }

    const LoadingComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
    }
    return (

        <SafeAreaView style={styles.container}>
            {loading ? <LoadingComponent /> :
                <>
                    <View style={styles.categoryFlats}>
                        <FlatList
                            data={data1}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            horizontal={true}
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <FlatList
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        data={displayedProducts}
                        contentContainerStyle={styles.containerContent}
                        renderItem={renderProduct}
                        horizontal={false}
                        numColumns={2}
                        style={styles.flatList}
                    />
                    <TouchableOpacity style={styles.lastOpacity} onPress={plusPressed}>
                        <Image source={require('../assets/img/plus.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </>}

        </SafeAreaView>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        width: 60
    },

    lastOpacity: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        width: 60

    },
    categoryFlats: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    flatList: {
        flex: 1,
    },

    showProds: {
        flex: 18,
        width: '100%'
    },
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
    containerContent: { alignItems: 'center', justifyContent: 'center' }

})
