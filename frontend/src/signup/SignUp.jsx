/*
- Name: SignUp
- author: rania rabie
- Date of creation: 8/18/2024
- Versions Information: 
- Dependencies:
- Contributors: rania rabie, nour khaled, shrouk ahmed
- last modified date: 8/18/2024
*/

// ------------------------------**************************------------------------------ //

import React from "react";
import {
  Alert,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import "./SignUp.css";
import { ClassNames } from "@emotion/react";

const regName = /^[A-Za-z\s]+$/; // Only letters and spaces are allowed
const regUserName = /^[a-zA-Z]{3}[a-zA-Z0-9_\s]*$/; // Only letters, numbers, underscore are allowed
const specialCharPattern = /[^a-zA-Z0-9_]/; // Detects any special character except underscore
const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email validation
const regNumber = /^(10|11|12|15)[0-9]{8}$/; // egypt numbers without +20 validation

const role = [
  {
    value: "Student",
    label: "Student",
  },

  {
    value: "Instructor",
    label: "Instructor",
  },
];

const country = [
  {
    value: "Egypt",
    label: "Egypt",
  },

  {
    value: "KSA",
    label: "KSA",
  },
];

const city = [
  {
    value: "Giza",
    label: "Giza",
  },

  {
    value: "Cairo",
    label: "Cairo",
  },

  {
    value: "Fayoum",
    label: "Fayoum",
  },
];

export default function SignUp() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    handleClick();
    console.log("Submitted Data: ", data); // For debugging
  };

  const password = watch("password");
  const name = watch("Name");
  const username = watch("UserName");
  const phone = watch("phone");
  const fullPhoneNumber = `+20${phone}`; // Concatenate prefix with the phone number

  // Password Validation
  const validatePassword = (value) => {
    const errors = [];

    if (value.length < 8) {
      errors.push("at least 8 characters long");
    }
    if (!/[A-Z]/.test(value)) {
      errors.push(" at least one uppercase letter");
    }
    if (!/[a-z]/.test(value)) {
      errors.push("contain lowercase letters");
    }
    if (!/\d/.test(value)) {
      errors.push("contain numbers");
    }
    if (!specialCharPattern.test(value)) {
      errors.push("at least one special character");
    }
    if (name && value.includes(name)) {
      errors.push("not contain your name");
    }
    if (username && value.includes(username)) {
      errors.push("not contain your username");
    }
    if (phone && (value.includes(phone) || value.includes(fullPhoneNumber))) {
      errors.push("not contain your phone number.");
    }

    if (errors.length === 0) return true;

    return `Password must ${errors.join(", ")}`;
  };
  // check if password matches
  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Passwords don't match";
    }
    return true;
  };

  return (
    <div className="container">
      <Box sx={{ my: 3 }}>
        <Typography 
          sx={{
            fontSize: "30px",
            py: 1,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Sign Up
        </Typography>

        <Typography sx={{ textAlign: "center" }}>
          Create an account to track your progress, showcase your skill-set and
          be a part of the community.
        </Typography>
      </Box>

      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack sx={{ gap: 2 }} direction={"row"}>
          {/* Name */}
          <Controller
            name="Name"
            control={control}
            rules={{
              required: "Name is required",
              pattern: {
                value: regName,
                message: "Name must contain characters only",
              },
              minLength: {
                value: 8,
                message: "Name must be at least 8 characters long",
              },
              maxLength: {
                value: 50,
                message: "Name must not exceed 50 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ flex: 1 }}
                label="Full Name"
                variant="filled"
                // 50-56=> for validation
                error={Boolean(errors.Name)}
                helperText={errors.Name ? errors.Name.message : null}
              />
            )}
          />

          {/* UserName */}
          <Controller
            name="UserName"
            control={control}
            rules={{
              required: "UserName is required",
              validate: (value) => {
                if (specialCharPattern.test(value)) {
                  return "UserName must Contain letters, numbers and uderscore only";
                }
                if (!regUserName.test(value)) {
                  return "UserName must start with at least 3 letters";
                }
                if (value.length < 6) {
                  return "UserName must be at least 6 characters long";
                }
                return true;
              },
              maxLength: {
                value: 50,
                message: "UserName must not exceed 50 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                // next lines for validation
                error={Boolean(errors.UserName)}
                helperText={errors.UserName ? errors.UserName.message : null}
                sx={{ flex: 1 }}
                label="UserName"
                variant="filled"
              />
            )}
          />
        </Stack>

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: regEmail,
              message: " invalid email address",
            },
            minLength: {
              value: 16,
              message: "invalid email address",
            },
            maxLength: {
              value: 40,
              message: "invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="filled"
              placeholder="e.g. examble@gmail.com" // Added placeholder
              error={Boolean(errors.email)}
              helperText={errors.email ? errors.email.message : null}
            />
          )}
        />

        {/* age */}
        <Stack sx={{ gap: 2 }} direction={"row"}>
          <Controller
            name="age"
            control={control}
            rules={{
              required: "Age is required",
              min: {
                value: 12,
                message: "Age must be at least 12",
              },
              max: {
                value: 50,
                message: "Age must not exceed 50",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ flex: 1 }}
                label="Age"
                type="number"
                variant="filled"
                error={Boolean(errors.age)}
                helperText={errors.age ? errors.age.message : null}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: 12,
                  max: 50,
                }}
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ flex: 1 }}
                variant="filled"
                select
                label="Role"
                error={Boolean(errors.role)}
                helperText={errors.role ? errors.role.message : null}
              >
                {role.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>

        {/* Country, City */}
        <Stack sx={{ gap: 2 }} direction={"row"}>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ flex: 1 }}
                variant="filled"
                select
                label="Country"
                error={Boolean(errors.country)}
                helperText={errors.country ? errors.country.message : null}
              >
                {country.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ flex: 1 }}
                variant="filled"
                select
                label="City"
                error={Boolean(errors.city)}
                helperText={errors.city ? errors.city.message : null}
              >
                {city.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>

        {/* phone */}
        <Stack direction={"row"} gap={2}>
          <TextField
            sx={{ flex: 0.3 }}
            value="+20"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            label="Country Code"
          />
          <TextField
            sx={{ flex: 1 }}
            error={Boolean(errors.phone)}
            helperText={
              errors.phone ? "please provide a valid phone Number" : null
            }
            {...register("phone", { required: true, pattern: regNumber })}
            label="Phone Number"
            variant="filled"
            placeholder="e.g. 1234567890" // Added placeholder
          />
        </Stack>

        {/* Password, Confirm Password */}
        <Stack direction={"row"} gap={2}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              validate: validatePassword,

              maxLength: {
                value: 50,
                message: "Password must not exceed 50 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                sx={{ flex: 1 }}
                {...field}
                label="Password"
                variant="filled"
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : null}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: validateConfirmPassword,
            }}
            render={({ field }) => (
              <TextField
                sx={{ flex: 1, gap: "2" }}
                {...field}
                label="Confirm Password"
                variant="filled"
                type="password"
                error={Boolean(errors.confirmPassword)}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : null
                }
              />
            )}
          />
        </Stack>
        {/* end Password, Confirm Password */}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button className="signupBtn" type="submit" variant="contained">
            Sign Up
          </Button>
        </Box>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Account created successfully
          </Alert>
        </Snackbar>
      </Box>

      <Typography sx={{ my: 1, textAlign: "center" }}>OR</Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button className="googleSignup" type="submit" variant="contained">
          <img src="../../public/google.png" alt="Google" />
          Continue with Google
        </Button>
      </Box>

      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Already have an account?
        <a href="#" style={{ textDecoration: "none" }}>
          Login
        </a>
      </Typography>
    </div>
  );
}
