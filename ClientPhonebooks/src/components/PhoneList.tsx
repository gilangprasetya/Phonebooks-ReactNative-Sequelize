import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ImagePicker, { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { updateContact, deleteContact } from '../actions/phonebooks';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFloppyDisk, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface PhoneListProps {
    id: number;
    name: string;
    phone: string;
    avatar: string;
    data: any[];
    setData: any;
}
interface CustomImagePickerResponse extends ImagePickerResponse {
    uri?: string;
}

const PhoneList: React.FC<PhoneListProps> = ({ id, name, phone, avatar, data, setData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedPhone, setEditedPhone] = useState(phone);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [avatarSource, setAvatarSource] = useState(avatar
        ? { uri: `http://localhost:3001/images/${avatar}` }
        : require('../../user.png'));

    const dispatch: any = useDispatch();

    const updateAvatar = (contactId: number, newAvatar: string) => {
        const updatedData = data.map((contact) =>
            contact.id === contactId ? { ...contact, avatar: newAvatar } : contact
        );

        setData(updatedData);
    };

    const handleImageClick = async () => {
        try {
            const response = await launchImageLibrary({
                mediaType: 'photo' as ImagePicker.MediaType,
            });

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error:', response.errorMessage);
            } else {
                const selectedAsset = response.assets && response.assets[0];
                if (selectedAsset) {
                    const imageUri = selectedAsset.uri;
                    const formData = new FormData();
                    formData.append('avatar', {
                        uri: imageUri,
                        type: 'image/jpeg',
                        name: 'avatar.jpg',
                    });

                    const axiosResponse = await axios.put(
                        `http://localhost:3001/api/phonebooks/${id}/avatar`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                    updateAvatar(id, axiosResponse.data.contact.avatar);
                    setAvatarSource({ uri: imageUri })
                }
            }
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await dispatch(updateContact(id, editedName, editedPhone));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleDelete = () => {
        return Alert.alert(
            'Delete Contact',
            'Are you sure want to remove this contact?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(deleteContact(id))
                        setShowConfirmModal(false)
                    },
                },
                {
                    text: 'No',
                    onPress: () => {
                        setShowConfirmModal(false)
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.image}>
                <TouchableWithoutFeedback onPress={handleImageClick}>
                    <Image
                        source={avatarSource}
                        style={styles.img}
                        resizeMode="cover"
                    />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.info}>
                {isEditing ? (
                    // Show input fields during edit mode
                    <View>
                        <TextInput
                            style={styles.input}
                            value={editedName}
                            onChangeText={setEditedName}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedPhone}
                            onChangeText={setEditedPhone}
                        />
                    </View>
                ) : (
                    // Show contact details in non-edit mode
                    <View>
                        <Text style={styles.name}>{editedName}</Text>
                        <Text style={styles.phone}>{editedPhone}</Text>
                    </View>
                )}
                <View>
                    {isEditing ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveClick}
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleEditClick}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleDelete}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        backgroundColor: 'rgb(213, 212, 212)',
    },
    image: {
        marginRight: 10,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 15,
        padding: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 5,
    },
    name: {
        fontSize: 16,
        marginBottom: 10,
    },
    phone: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#rgb(213, 212, 212)',
        borderRadius: 5,
        padding: 5,
        paddingTop: 10,
    },
});

export default PhoneList;