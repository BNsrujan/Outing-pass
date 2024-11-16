import { StyleSheet, View, Text, TextInput, SafeAreaView, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomButton from "@/components/ui/CustomButton";
import { Link } from "expo-router";

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    usn: Yup.string()
        .required("USN is required")
        .matches(/^[A-Za-z0-9]+$/, "USN can only contain letters and numbers"),
});

export default function Login() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Formik
                initialValues={{ email: "", password: "", usn: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                    axios.post('/login', values)
                        .then(response => {
                            console.log(response.data);
                            setSubmitting(false);
                        })
                        .catch(error => {
                            setFieldError("general", "Login failed. Please try again.");
                            setSubmitting(false);
                        });
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting
                }) => (
                    <View style={styles.container}>
                        <Text style={styles.title}>Login</Text>

                        {errors.general && <Text style={styles.error}>{errors.general}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="USN"
                            placeholderTextColor="gray"
                            onChangeText={handleChange("usn")}
                            onBlur={handleBlur("usn")}
                            value={values.usn}
                        />
                        {touched.usn && errors.usn ? (
                            <Text style={styles.error}>{errors.usn}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {touched.email && errors.email ? (
                            <Text style={styles.error}>{errors.email}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry
                        />
                        {touched.password && errors.password ? (
                            <Text style={styles.error}>{errors.password}</Text>
                        ) : null}

                        <Link style={styles.Link} href={"./register"}>Don't have an account? Register</Link>
                        <CustomButton
                            title="Login"
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                            style={styles.Button}
                        >
                            {isSubmitting ? <ActivityIndicator color="#fff" /> : null}
                        </CustomButton >
                    </View>
                )}
            </Formik>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        // backgroundColor: 
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    error: {
        color: "red",
        marginBottom: 10,
    },

    Link: {
        textSizeAdjust: Link
    }
});
