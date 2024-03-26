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
    <div className="flex flex-row items-center gap-4">
      <label className="w-[100px] ml-2" htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input text-center min-w-[300px]" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-row items-center gap-4">
        <label className="w-[100px] ml-2" htmlFor={props.id || props.name}>{label}</label>
        <select className="w-[180px] text-center" {...field} {...props} />
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

    console.log("categories", categories)

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
    <div className="gap-3 mx-3 items-center">
        <div className="w-[250px]">
            <h1 className="font-bold bg-amber-300">New Qanda</h1>
        </div>
      
      <Formik
        initialValues={{
          category: categories ? categories[0].name : '',
          question: '',
          answer: '',
          note: ''
        }}
        validationSchema={Yup.object({
            category: Yup.string()
            .required('Required'),
            question: Yup.string()
            .max(200, 'Must be 20 characters or less')
            .required('Required'),
            answer: Yup.string()
            .max(200, 'Must be 20 characters or less')
            .required('Required'),
            note: Yup.string()
            .max(200, 'Must be 20 characters or less')
        })}
        onSubmit={handleSubmit}
      >

        <Form className="border-solid border-2 border-blue ">

            <MySelect label="category" name="category">
                {categories.map((category) => (
                    <option className="text-center" value={category.name}> {category.name} </option>
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

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-20 rounded ml-3  mt-1 mb-4">Create</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewQandaForm;

