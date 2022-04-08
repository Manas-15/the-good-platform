import React from 'react';
import { Formik, Form } from 'formik';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import API from '../services/api';
import {LoginSchema} from './../Validations';

const authenticate = () => {
  console.log("create coming")
  axios({
    'url': API.login,
    'headers': {
        'content-type':'application/octet-stream',
        'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
    },
    'params': {
        'search':'parameter',
    },
})
}
const Login = () => (
  <div style={{width: '350px'}}>
    <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("create coming 1111111", values)
          authenticate();
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
        <Form>
            <h3>Sign In</h3>
            <div className="form-group">
            <label>Email address</label>
            <input type="email" 
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email} 
              className="form-control" 
              placeholder="Enter email" 
            />
            <span className="error">{errors.email && touched.email && errors.email}</span>
            </div>
            <div className="form-group">
            <label>Password</label>
            <input type="password" 
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="form-control" 
              placeholder="Enter password" 
            />
            <span className="error">{errors.password && touched.password && errors.password}</span>
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">&nbsp;Remember me</label>
                </div>
            </div>
            <div className="text-center m-3">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">Submit</button>
            </div>
            <p className="forgot-password text-center">
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
            <p className="forgot-password text-center">
                Forgot <Link to="/forgot-password">Password?</Link>
            </p>
        </Form>
        )}
      </Formik>
    </div>
)
export default Login;