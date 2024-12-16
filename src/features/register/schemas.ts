import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1, "Password must contain at least 1 lowercase letter")
    .minNumbers(1)
    .minUppercase(1, "Password must contain at least 1 uppercase letter")
    .min(6, "Password must be at least 6 characters")
});
