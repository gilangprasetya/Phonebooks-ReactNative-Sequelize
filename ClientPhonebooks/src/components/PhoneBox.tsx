import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPhonebooks,
    addContact,
    setCurrentPage,
    setSearchKeyword,
} from "../actions/phonebooks";
import PhoneHeader from "./PhoneHeader";
import { View, FlatList } from "react-native";
import { PhonebookItem } from "./PhonebookItem";
import PhoneList from "./PhoneList";

export default function PhoneBox({ navigation }: { navigation: any }) {
    const dispatch: any = useDispatch();
    const {
        data,
        sortOrder,
        currentPage,
        totalPages,
        searchKeyword,
        isLoading,
    } = useSelector((state: any) => state.phonebook);

    const [localData, setLocalData] = useState([]);

    const isLoadingRef = useRef(false);

    useEffect(() => {
        dispatch(fetchPhonebooks(currentPage, sortOrder, searchKeyword));
    }, [dispatch, currentPage, sortOrder, searchKeyword]);

    const handleSearch = (keyword: any) => {
        dispatch(setSearchKeyword(keyword));
        dispatch(setCurrentPage(1));
    };

    const handleLoadMore = useCallback(() => {
        if (currentPage < totalPages && !isLoadingRef.current) {
            isLoadingRef.current = true;
            dispatch(setCurrentPage(currentPage + 1));
        }
    }, [currentPage, totalPages, isLoadingRef, dispatch]);

    const renderItem = ({ item }: { item: PhonebookItem }) => (
        <PhoneList
            id={item.id}
            name={item.name}
            phone={item.phone}
            avatar={item.avatar}
            data={localData}
            setData={setLocalData}
        />
    );

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    return (
        <View style={{ flex: 1 }}>
            <View>
                <PhoneHeader
                    sortOrder={sortOrder}
                    setSortOrder={(order) =>
                        dispatch({ type: "SET_SORT_ORDER", payload: order })
                    }
                    handleSearch={handleSearch}
                    navigation={navigation}
                />
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}
