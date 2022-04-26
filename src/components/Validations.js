import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
});

export const SetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Password and confirm password must match')
});

export const CorporateSchema = Yup.object().shape({
  organizationName: Yup.string().required("Organization name is required"),
  email: Yup.string()
    .required("Organization email is required")
    .email("Invalid email address"),
  website: Yup.string()
    .required("Website is required")
    .matches(
      /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
      "Please enter valid website"
    ),
  regdNumber: Yup.string().required("Regd number is required"),
  organizationSize: Yup.string().required("Organization size is required"),
  organizationType: Yup.string().required("Organization type is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(10, "Please enter valid phone number")
    .max(14, "Please enter valid phone number"),
  contactPerson: Yup.string().required("Contact person is required"),
});

export const EmployeeSchema = Yup.object().shape({
  employeeName: Yup.string().required("Employee name is required"),
  email: Yup.string()
    .required("Employee email is required")
    .email("Invalid email address"),
  employeeId: Yup.string().required("Employee ID is required"),
  pan: Yup.string().required("PAN is required"),
  corporateProfileId: Yup.string().required("Please select organization"),
  organizationJoiningDate: Yup.date()
    .nullable()
    .required("Organization joining date is required"),
  gender: Yup.string().required("Please select gender"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(10, "Please enter valid phone number")
    .max(14, "Please enter valid phone number"),
});

export const PaymentSchema = Yup.object().shape({
  titel: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Organization email is required")
    .email("Invalid email address"),  
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
});
