import { StyleSheet, View, Text, TextInput, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomButton from "@/components/ui/CustomButton";
import { Link } from "expo-router";

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .required()
        .email("Invalid email"),
    password: Yup.string()
        .required()
        .min(6, "Password must be at least 6 characters long"),
    usn: Yup.string()
        .required()
        .matches(/^[A-Za-z0-9]+$/, "USN can only contain letters and numbers"),
});

export default function Login() {
    return (
        <SafeAreaView>

            <Formik
                initialValues={{ email: "", password: "", usn: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('your_api_url_here', values)
                        .then(response => {
                            console.log(response.data);
                            setSubmitting(false);
                        })
                        .catch(error => {
                            console.error(error);
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

                        <CustomButton
                            title="Login"
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        />
                    </View>
                )}
            </Formik>
            <Link href={"./register"}>Don't have an account? Register</Link>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
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
});

