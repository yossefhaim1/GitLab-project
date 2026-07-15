import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { useRegisterMutation } from "../React_Queries/authMutations";

export function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] =
    useState<string>("");

  const [localError, setLocalError] = useState<string>("");

  const [showPassword, setShowPassword] =
    useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const registerMutation = useRegisterMutation();

  function handleRegister(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLocalError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setLocalError("כל השדות חובה למילוי");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("הסיסמאות אינן תואמות");
      return;
    }

    registerMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      password,
    });
  }

  const isEmptyFieldsError =
    localError === "כל השדות חובה למילוי";

  const isPasswordMatchError =
    localError === "הסיסמאות אינן תואמות";

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
      noValidate
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f5f7",
        p: 3,
        gap: 2,
        px: 2,
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        fontWeight={700}
      >
        Register
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        gutterBottom
      >
        Please fill in the form to create an account.
      </Typography>

      {isEmptyFieldsError && (
        <Alert
          severity="error"
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          {localError}
        </Alert>
      )}

      {registerMutation.isError && (
        <Alert
          severity="error"
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          ההרשמה נכשלה. ייתכן שהאימייל כבר קיים.
        </Alert>
      )}

      <TextField
        label="Name"
        name="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);

          if (localError) {
            setLocalError("");
          }
        }}
        error={isEmptyFieldsError && !name.trim()}
        fullWidth
        sx={{
          maxWidth: 400,
          bgcolor: "background.paper",
        }}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);

          if (localError) {
            setLocalError("");
          }
        }}
        error={isEmptyFieldsError && !email.trim()}
        fullWidth
        sx={{
          maxWidth: 400,
          bgcolor: "background.paper",
        }}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);

          if (localError) {
            setLocalError("");
          }
        }}
        error={isEmptyFieldsError && !password.trim()}
        fullWidth
        sx={{
          maxWidth: 400,
          bgcolor: "background.paper",
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  edge="end"
                  aria-label={
                    showPassword
                      ? "הסתר סיסמה"
                      : "הצג סיסמה"
                  }
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                >
                  {showPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);

          if (localError) {
            setLocalError("");
          }
        }}
        error={
          isPasswordMatchError ||
          (isEmptyFieldsError && !confirmPassword.trim())
        }
        helperText={
          isPasswordMatchError ? localError : ""
        }
        fullWidth
        sx={{
          maxWidth: 400,
          bgcolor: "background.paper",
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  edge="end"
                  aria-label={
                    showConfirmPassword
                      ? "הסתר אישור סיסמה"
                      : "הצג אישור סיסמה"
                  }
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous,
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={registerMutation.isPending}
        fullWidth
        sx={{
          maxWidth: 400,
          minHeight: 48,
        }}
      >
        {registerMutation.isPending ? (
          <CircularProgress size={24} />
        ) : (
          "Register"
        )}
      </Button>

      <Typography variant="body2">
        כבר יש לך משתמש?{" "}
        <Link to="/login">להתחברות</Link>
      </Typography>
    </Box>
  );
}