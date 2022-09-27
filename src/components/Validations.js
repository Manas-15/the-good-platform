import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required")
});

export const SetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and confirm password must match"
    )
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
  contactPerson: Yup.string().required("Contact person is required")
});

export const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Employee email is required")
    .email("Invalid email address"),
  employeeId: Yup.string().required("Employee ID is required"),
  pan: Yup.string().required("PAN is required"),
  corporateProfileId: Yup.string().required("Please select corporate"),
  password: Yup.string().required("Password is required"),
  // organizationJoiningDate: Yup.date()
  //   .nullable()
  //   .required("Organization joining date is required"),
  gender: Yup.string().required("Please select gender"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(10, "Please enter valid phone number")
    .max(14, "Please enter valid phone number")
});

export const addProgramSchema = Yup.object().shape({
  // socialName: Yup.string().required("Programme name is required"),
  charityName: Yup.string().required("Charity name is required"),
  category: Yup.string().required("Category is required"),
  unit_price: Yup.string().required("Price is required"),
  employeeId: Yup.string().required("Employee ID is required")
});

export const EmployeeByCorporateSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Employee email is required")
    .email("Invalid email address"),
  employeeId: Yup.string().required("Employee ID is required"),
  pan: Yup.string().required("PAN is required"),
  corporateProfileId: Yup.string().required("Please select corporate"),
  password: Yup.string().required("Password is required"),
  gender: Yup.string().required("Please select gender"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(10, "Please enter valid phone number")
    .max(14, "Please enter valid phone number")
});
export const IndividualSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string().required("Password is required"),
  pan: Yup.string().required("PAN is required"),
  gender: Yup.string().required("Please select gender"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(10, "Please enter valid phone number")
    .max(14, "Please enter valid phone number")
});

export const SsoSchema = Yup.object().shape({
  issueUrl: Yup.string()
    .required("IssueUrl name is required")
    .matches(
      /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
      "Please enter valid url"
    ),
  loginUrl: Yup.string()
    .required("LoginUrl name is required")
    .matches(
      /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
      "Please enter valid url"
    ),
  logoutUrl: Yup.string()
    .required("LogoutUrl name is required")
    .matches(
      /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
      "Please enter valid url"
    ),
  securityCertificate: Yup.string().required(
    "Security Certificate name is required"
  ),
  metaData: Yup.string().required("Metadata name is required"),
  issuerID: Yup.string().required("IssuerID name is required"),
  acsUrl: Yup.string()
    .required("AcsUrl name is required")
    .matches(
      /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
      "Please enter valid url"
    )
});

export const PaymentSchema = Yup.object().shape({
  customerName: Yup.string().required("Name is required"),
  customerEmail: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  customerPhone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Must be number only")
    .min(10, "Please enter valid phone number")
    .max(10, "Please enter valid phone number"),
  customerPan: Yup.string().required("PAN is required")
  // customerDob: Yup.date().nullable().required("Date of birth is required"),
});
export const CompleteBatchSchema = Yup.object().shape({
  referenceId: Yup.string().required("Reference ID is required"),
  referenceNote: Yup.string().required("Reference note is required")
});
export const Mail80GSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
});
