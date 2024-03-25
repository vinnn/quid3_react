import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_API_SERVER_URL } from "../../config"



const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_URL = REACT_APP_API_SERVER_URL;


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-row items-center gap-4">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input text-center" {...field} {...props} />
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
const FormNewQanda = () => {

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
    <div className="flex flex-row gap-3 mx-3 items-center">
      <h1 className="font-bold">New Category</h1>
      <Formik
        initialValues={{
          question: '',
          answer: '',
          note: '',       
        }}
        validationSchema={Yup.object({
            name: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required')
        })}
        onSubmit={handleSubmit}
      >

        <Form className="flex flex-row">
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="name"
          />

          <MySelect label="Category" name="category">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded mx-2 my-3">Create</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormNewQanda;

