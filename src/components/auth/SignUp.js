import React, { useState } from 'react';
import { Formik } from 'formik';
import {Link} from 'react-router-dom';
import {CorporateSchema} from './../Validations';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { corporateActions } from '../../actions';

const initialValues = {
    organizationName: '', 
    organizationEmail: '', 
    website: '', 
    regdNumber: '', 
    organizationSize: '',
    organizationType: '',
    contactNumber: '',
    contactPerson: '',
    address: '',
    city: '',
    state: '',
    country: '',
}
const sizeOptions = [
    { value: "1-50", label: "1-50" },
    { value: "50-100", label: "50-100" },
    { value: "100-500", label: "100-500" },
    { value: "500-1000", label: "500-1000" },
    { value: ">1000", label: ">1000" }
  ];
const SignUp = () => {
    let history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const addingCorporate = useSelector(state => state.corporates.addingCorporate);
    const dispatch = useDispatch();
    const corporateRegister = (values) => {
        console.log("create coming", values);
        setSubmitted(true);
        if (values.organizationName && values.organizationEmail && values.regdNumber) {
            dispatch(corporateActions.addCorporate(values));
        }
        // axios({
        //   'url': API.login,
        //   'headers': {
        //       'content-type':'application/octet-stream',
        //       'x-rapidapi-host':'example.com',
        //       // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
        //   },
        //   'params': {
        //       'search':'parameter',
        //   },
        // })
    }

    return(<div style={{width: '650px'}}>
        <Formik
            initialValues={initialValues}
            validationSchema={CorporateSchema}
            onSubmit={(values, { setSubmitting }) => {
                corporateRegister(values)
            }}
        >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form>
            <h3>Corporate Register</h3>
            <hr/>
            <h6>Basic Information</h6>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Organization Name</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    name="organizationName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.organizationName} 
                    className="form-control" 
                    placeholder="Organization Name" 
                />
                <span className="error">{errors.organizationName && touched.organizationName && errors.organizationName}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Organization Email</label>
                </div>
                <div className="col-md-8">
                    <input type="email" 
                    name="organizationEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.organizationEmail} 
                    className="form-control" 
                    placeholder="Organization Email" 
                />
                <span className="error">{errors.organizationEmail && touched.organizationEmail && errors.organizationEmail}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Website</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    name="website" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website} 
                    className="form-control" 
                    placeholder="Website" 
                />
                    <span className="error">{errors.website && touched.website && errors.website}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Regd Number</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    name="regdNumber" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.regdNumber} 
                    className="form-control" 
                    placeholder="Regd Number" 
                />
                    <span className="error">{errors.regdNumber && touched.regdNumber && errors.regdNumber}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Organization Size</label>
                </div>
                <div className="col-md-8">
                    <select name="organizationSize" class="form-select" onChange={handleChange}>
                    <option selected>Select Corporate Size</option>
                    {sizeOptions.map((size) =>
                        <option value={size.value}>{size.label}</option>
                    )}
                    </select>
                    <span className="error">{errors.organizationSize && touched.organizationSize && errors.organizationSize}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Organization Type</label>
                </div>
                <div className="col-md-8">
                    <input type="text"
                    className="form-control"
                    name="OrganizationType" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.OrganizationType} 
                     placeholder="Organization Type" 
                    />
                </div>
            </div>
            <hr/>
            <h6>Communication Details</h6>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Contact Number</label>
                </div>
                <div className="col-md-8">
                    <input type="text"
                    className="form-control"
                    name="contactNumber" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contactNumber} 
                    placeholder="Contact Number" 
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Contact Person</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    className="form-control"
                    name="contactPerson" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contactPerson} 
                    placeholder="Contact Person"
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Address</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    className="form-control" 
                    name="address" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address} 
                    placeholder="Address" 
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">City</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    className="form-control"
                    name="city" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    placeholder="City"
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">State</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    className="form-control"
                    name="state" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    placeholder="State"
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className="mt-1">Country</label>
                </div>
                <div className="col-md-8">
                    <input type="text" 
                    className="form-control" 
                    name="country" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    placeholder="Country" 
                    />
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary btn-block">
                    {addingCorporate && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Register
                </button>
            </div>
            <div className="forgot-password text-center">
                Already registered? <Link to="/sign-in">Sign In</Link>
            </div>
        </form>
         )}
         </Formik>
    </div>)
}
export default SignUp;