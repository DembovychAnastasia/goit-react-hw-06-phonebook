import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { FormField, Form, ErrorMessage, Label, Button } from './FormContact.styled';
import PropTypes from 'prop-types';
import { BsFillTelephonePlusFill } from 'react-icons/bs';
import { MdContactPhone } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice';
import { toast } from 'react-toastify';



const ContactSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = { name: '', number: '' };
const getContacts = state => state.contacts.items;

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.trim();

    const dublicate = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() === normalizedName ||
        contact.number.trim() === normalizedNumber
    );
    return Boolean(dublicate);
  };

  const onAddContact = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      return toast.error(
        `This contact is already in contacts`,
        toast
      );
    }
    dispatch(addContact({ name, number }));
    // const action = addContact({ name, number });
    // dispatch(action);
  };
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={(values, { resetForm }) => {
      onAddContact({ ...values });
      resetForm();
      }}

      validationSchema={ContactSchema}
     
    >
      <Form  autoComplete="off">
        <FormField>
        <Label>
          <MdContactPhone size="20"/>
          Name</Label>
          <Field  
          type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            id={nanoid()}
            required/>
          <ErrorMessage name="name" component="div" />
        </FormField>
        <FormField>
          <Label>
          <BsFillTelephonePlusFill size="20"/>
          Number</Label>
          <Field  
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          id={nanoid()}
          required/>
          <ErrorMessage name="name" component="div" /> 
        </FormField>
    
        <Button type="submit">Add contact</Button>
      </Form>
    
    </Formik>

  )}

  ContactForm.propType = {
    onSubmit: PropTypes.func.isRequired,
  };