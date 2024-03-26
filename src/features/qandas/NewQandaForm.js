import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { postNewQanda } from './qandasSlice'
import { getAllCategories } from '../categories/categoriesSlice'

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-row items-center gap-4 justify-center text-center">
      <label className="px-2" htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input text-center" {...field} {...props} 
    //   onChange={e => { field.onChange(props.name)(e.target.value + 'rrr')}}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-row items-center gap-4 justify-center text-center">
        <label className="text-center" htmlFor={props.id || props.name}>{label}</label>
        <select className="text-center" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };


// And now we can use these
const NewQandaForm = () => {

    const dispatch = useDispatch()
    const { getAccessTokenSilently } = useAuth0();
    const categories = useSelector(getAllCategories)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const handleSubmit = async (values) => {
        console.log("values", values)
        try {
            setAddRequestStatus('pending')
            const post_args = {
                "getAccessTokenSilently": getAccessTokenSilently,
                "body": values
            }
            dispatch(postNewQanda(post_args)).unwrap()
        } catch (err) {
            console.error('Failed to save the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

  return (
    <div className="flex flex-row gap-3 mx-3 items-center">
      <h1 className="font-bold">New Qanda</h1>
      <Formik
        initialValues={{
          category: categories ? categories[0] : '',
          question: '',
          answer: '',
          note: ''
        }}
        validationSchema={Yup.object({
            category: Yup.string()
            .required('Required'),
            question: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
            answer: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
            note: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required')
        })}
        onSubmit={handleSubmit}
      >

        <Form className="flex flex-row">

            <MySelect label="Category" name="category">
                {categories.map((category) => (
                    <option value={category.name}> {category.name} </option>
                ))}
            </MySelect>

            <MyTextInput
                label="question"
                name="question"
                type="text"
                placeholder="question"
            />

            <MyTextInput
                label="answer"
                name="answer"
                type="text"
                placeholder="answer"
            />

            <MyTextInput
                label="note"
                name="note"
                type="text"
                placeholder="note"
            />

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded mx-2 my-3">Create</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewQandaForm;

