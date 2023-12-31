import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { CustomPalette } from "types/ThemesType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "utils/apiFunctions";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister: any = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin: any = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState<string>("login");
  const theme = useTheme<CustomPalette>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const queryClient = useQueryClient();

  // Define mutations for registration and login
  const registerMutation = useMutation({mutationFn: registerUser});
  const loginMutation = useMutation({ mutationFn: loginUser});

  const register = async (values: any, onSubmitProps: any) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    try {
      await registerMutation.mutateAsync(formData);
      // queryClient.invalidateQueries("user"); 
      setPageType("login");
    } catch (error: any) {
      console.log("Register Error : ", error.message);
    } finally {
      onSubmitProps.resetForm();
    }
  };

  const login = async (values: any, onSubmitProps: any) => {
    try {
      const loggedIn = await loginMutation.mutateAsync(values);

      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    } catch (error: any) {
      console.log("Login Error : ", error.message)
    } finally {
      onSubmitProps.resetForm();
    }
  };

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <>
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={
                      touched.firstName && typeof errors.firstName === "string"
                        ? errors.firstName
                        : ""
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={
                      touched.lastName && typeof errors.lastName === "string"
                        ? errors.lastName
                        : ""
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={
                      touched.location && typeof errors.location === "string"
                        ? errors.location
                        : ""
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={
                      touched.occupation &&
                      typeof errors.occupation === "string"
                        ? errors.occupation
                        : ""
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4 "
                    border={`1px solid ${theme.palette.neutral.medium}`}
                    borderRadius="5px"
                    padding="1rem"
                  >
                    <Dropzone
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${theme.palette.primary.main}`}
                          padding="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={
                  touched.email && typeof errors.email === "string"
                    ? errors.email
                    : ""
                }
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={
                  touched.password && typeof errors.password === "string"
                    ? errors.password
                    : ""
                }
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {/* Button */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  margin: "2rem 0",
                  padding: "1rem",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(pageType === "login" ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: theme.palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        </>
      )}
    </Formik>
  );
};

export default Form;
