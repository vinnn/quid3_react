import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllQandas } from '../qandas/qandasSlice'
import { getAllCategories } from '../categories/categoriesSlice'

import { postNewGame } from '../games/gamesSlice'



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
const NewGameForm = () => {

    const dispatch = useDispatch()
    const { getAccessTokenSilently } = useAuth0();
    const qandas = useSelector(getAllQandas)
    // const categories = useSelector(getAllCategories)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const extra_qandas_options = [0,1,2,3,4,5,6,7,8,9,10]

    const selectedQandaIds = qandas.filter((q) => q.selected == true).map((q)=>q.id)

    const numberSelectedQandas = selectedQandaIds.length


    const handleSubmit = async (values) => {

        const body = {
            ...values, 
            "extra_qandas": Number(values.extra_qandas),
            "qanda_ids": selectedQandaIds
        }
        console.log("body", body)

        try {
            setAddRequestStatus('pending')
            const post_args = {
                "getAccessTokenSilently": getAccessTokenSilently,
                "body": body
            }
            dispatch(postNewGame(post_args)).unwrap()
        } catch (err) {
            console.error('Failed to save the game', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

  return (
    <div className="gap-3 mx-3 items-center">
        <div className="w-[250px]">
            <h1 className="font-bold bg-amber-300">New Game</h1>
        </div>
      
      <Formik
        initialValues={{
          name: '',
          extra_qandas: 0
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                .max(200, 'Must be 20 characters or less')
                .required('Required'),
            extra_qandas: Yup.number().integer()
        })}
        onSubmit={handleSubmit}
      >

        <Form className="border-solid border-2 border-blue ">

            <MyTextInput
                label="name"
                name="name"
                type="text"
                placeholder="game"
            />

            <div className="flex flex-row items-center gap-4">
                <div className="w-[100px] ml-2">qas selected</div>
                <div className="text-input text-center min-w-[160px]"> {numberSelectedQandas} </div>
            </div>

            <MySelect label="extra qas" name="extra_qandas">
                {extra_qandas_options.map((nb,i) => (
                    <option key={i} className="text-center" value={nb}> {nb} </option>
                ))}
            </MySelect>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-20 rounded ml-3  mt-1 mb-4">Create</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewGameForm;

