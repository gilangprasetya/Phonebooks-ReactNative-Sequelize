import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUpZA, faArrowDownZA, faUserPlus } from "@fortawesome/free-solid-svg-icons";

interface PhoneHeaderProps {
    sortOrder: string;
    setSortOrder: (order: string) => void;
    handleSearch: (keyword: string) => void;
    navigation: any;
}

const PhoneHeader: React.FC<PhoneHeaderProps> = ({ sortOrder, setSortOrder, handleSearch, navigation }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSortClick = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    };

    const handleSearchChange = (keyword: string) => {
        setSearchKeyword(keyword);
        handleSearch(keyword);
    };

    const handleAdd = () => {
        navigation.navigate('Add')
    }

    return (
        <View style={{ marginTop: 30, padding: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
                <TouchableOpacity onPress={handleSortClick}>
                    {sortOrder === "desc" ? (
                        <FontAwesomeIcon icon={faArrowDownZA} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowUpZA} />
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ width: "90%", height: "100%" }}>
                <TextInput onChangeText={handleSearchChange} style={styles.input} placeholder="Search..." />
            </View>
            <View>
                <TouchableOpacity onPress={handleAdd}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        padding: 8,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    buttonBrown: {
        backgroundColor: "#a57722",
        color: "white",
        padding: 14,
        margin: 8
    }
});

export default PhoneHeader;

