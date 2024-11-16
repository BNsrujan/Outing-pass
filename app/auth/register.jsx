import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomButton from "@/components/ui/CustomButton";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

// Validation schema with consistent key names
const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    usn: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, "USN can only contain letters and numbers")
        .required("USN is required"),
    room: Yup.string()
        .required("Room is required"),
    block: Yup.string()
        .oneOf(["A", "B", "C", "D"], "Invalid Block")
        .required("Block is required"),
});

export default function Register() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    usn: "",
                    room: "",
                    block: "", // lowercase to match validation schema
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        const response = await axios.post("http://localhost:8081/student/v1/signup", values);
                        console.log(response)
                        Alert.alert("Success", "Registration successful!", [
                            {
                                text: "OK",
                                onPress: () => {
                                    resetForm();
                                    navigation.navigate("Login");
                                },
                            },
                        ]);
                    } catch (error) {
                        if (error.response) {
                            console.log("Request error:", error.response.data);
                        } else if (error.response) {
                            console.log("Request error:", error.request);
                        } else {
                            console.log("error", error.message);
                        }

                        Alert.alert(
                            "Error",
                            error.response?.data?.message || "Something went wrong. Please try again."
                        );
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    setFieldValue,
                }) => (
                    <View style={styles.container}>
                        <Text style={styles.title}>Register</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            placeholderTextColor="gray"
                        />
                        {touched.name && errors.name && (
                            <Text style={styles.error}>{errors.name}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                            placeholderTextColor="gray"
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.error}>{errors.email}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry
                            placeholderTextColor="gray"
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.error}>{errors.password}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="USN"
                            onChangeText={handleChange("usn")}
                            onBlur={handleBlur("usn")}
                            value={values.usn}
                            placeholderTextColor="gray"
                        />
                        {touched.usn && errors.usn && (
                            <Text style={styles.error}>{errors.usn}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Room"
                            onChangeText={handleChange("room")}
                            onBlur={handleBlur("room")}
                            value={values.room}
                            placeholderTextColor="gray"
                        />
                        {touched.room && errors.room && (
                            <Text style={styles.error}>{errors.room}</Text>
                        )}

                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={values.block}
                                onValueChange={(itemValue) => setFieldValue("block", itemValue)}
                                style={styles.picker}
                                mode="dropdown"
                            >
                                <Picker.Item label="Select Block" value="" />
                                <Picker.Item label="A" value="A" />
                                <Picker.Item label="B" value="B" />
                                <Picker.Item label="C" value="C" />
                                <Picker.Item label="D" value="D" />
                            </Picker>
                        </View>
                        {touched.block && errors.block && (
                            <Text style={styles.error}>{errors.block}</Text>
                        )}

                        {isSubmitting ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <CustomButton
                                title="Register"
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            />
                        )}
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#333",
    },
    pickerContainer: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: {
        height: 50,
        width: "100%",
    },
    error: {
        color: "red",
        marginBottom: 10,
        marginLeft: 5,
    },
});
