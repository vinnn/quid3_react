import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_API_SERVER_URL } from "../config"



const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_URL = REACT_APP_API_SERVER_URL;


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently from other input 
  // types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be 
  // included in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};






// And now we can use these
const Create = () => {


    const { getAccessTokenSilently } = useAuth0();


    const handleSubmit = async (values, { setSubmitting }) => {
        // Submitting for data to the server
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: API_AUDIENCE,
                    scope: AUTH_SCOPE
                },
            });
    
            console.log("tok", accessToken)
    
            const response = await fetch(API_URL + "/qandas/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(values), // converting for data to JSON and sending it
            });
    
            if (response.ok) {
                console.log('Form submitted:', values);
                // Perform actions after successfully handling the request here
            } else {
                console.log('An error occurred while submitting the form');
            }
        } catch (error) {
            console.log('An error occurred while submitting the form', error);
        }
    
        // Set isSubmitting to false when the form submission is complete
        setSubmitting(false);
    
    }
    







  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          question: '',
          answer: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          jobType: '', // added for our select
        }}
        validationSchema={Yup.object({
            question: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
            answer: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required'),
        })}
        onSubmit={handleSubmit}
      >

        <Form>
          <MyTextInput
            label="The question"
            name="question"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="The answer"
            name="answer"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default Create;

