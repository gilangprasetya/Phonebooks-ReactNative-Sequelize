import { useState } from "react"
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useDispatch } from "react-redux"
import { addContact } from "../actions/phonebooks"

export default function PhoneForm({ navigation }: { navigation: any }) {
    const dispatch: any = useDispatch()
    const [contact, setContact] = useState({ name: '', phone: '' })
    const submit = () => {
        dispatch(addContact(contact.name, contact.phone))
        setContact({ name: '', phone: '' })
        navigation.navigate('Home')
    }
    return (
        <View>
            <View style={styles.area}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={value => setContact({ ...contact, name: value })}
                    value={contact.name}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    onChangeText={value => setContact({ ...contact, phone: value })}
                    value={contact.phone}
                />
            </View>
            <View>
                <TouchableOpacity onPress={submit} style={styles.save}>
                    <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel} onPress={() => navigation.navigate('Home')}>
                    <Text style={{ textAlign: "center", color: "white" }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    area:{
        marginTop: 35,
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        margin: 8,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    save: {
        backgroundColor: "#3e96f4",
        padding: 14,
        margin: 8
    },
    cancel: {
        backgroundColor: "#787878",
        padding: 14,
        margin: 8
    },
});