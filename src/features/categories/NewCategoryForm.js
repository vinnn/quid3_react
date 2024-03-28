import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { postNewCategory } from './categoriesSlice'


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-row items-center gap-4">
      <label className="w-[100px] ml-2" htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input text-center min-w-[300px]" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};


const NewCategoryForm = () => {

    const dispatch = useDispatch()
    const { getAccessTokenSilently } = useAuth0();
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const handleSubmit = async (values) => {
        try {
            setAddRequestStatus('pending')
            const post_args = {
                "getAccessTokenSilently": getAccessTokenSilently,
                "body": values
            }
            dispatch(postNewCategory(post_args)).unwrap()
        } catch (err) {
            console.error('Failed to save the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

  return (
    <div className="gap-3 mx-3 items-center">
        <div className="w-[250px]">
            <h1 className="font-bold bg-amber-300">New Category</h1>
        </div>
      
        <div>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required')
                })}
                onSubmit={handleSubmit}
            >
                <Form className="border-solid border-2 border-blue ">
                    <MyTextInput
                        label="name"
                        name="name"
                        type="text"
                        placeholder="category"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-20 rounded ml-3  mt-1 mb-4">Create</button>           
                </Form>
            </Formik>
        </div>
    </div>
  );
};

export default NewCategoryForm;

