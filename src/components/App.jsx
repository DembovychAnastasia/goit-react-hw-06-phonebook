import { GlobalStyle } from "./GlobalStyle";
import { Section } from "./Section/Section";
import { nanoid } from 'nanoid';

import { useState, useEffect} from 'react';
import { Container } from "./Container";
import {ContactForm} from "./FormContact/FormContact";
import { ContactList } from "./ContactList/ContacttList";
import { Filter } from "./FilterContact/FilterContact";


const contactsState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const getInitialContact =() => {
  const savedContact = localStorage.getItem('contacts');
  if (savedContact !== null) {
   return JSON.parse(savedContact) 
  } else {
  return contactsState ;  }

}

export const App = () => {
 const [filter, setFilter] = useState('');
 const [contacts, setContacts] = useState(getInitialContact)


 useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

 const addContact = (newContact) => {
 const newName=contacts.some(
  ({ name, number }) =>
    name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
    number.trim() === newContact.number.trim()
);
if (newName) {
  return alert(
    `${newContact.name}: is already in contacts`
  );
}
setContacts(contacts => [{ ...newContact, id: nanoid() }, ...contacts]);
};

const deleteContact = (contactId) => {
  setContacts(contacts.filter(contact => contact.id !== contactId));
}

const getFilteredContacts= () => {
  const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
}
const changeFilter = e => {
  setFilter(e.currentTarget.value);
};
 


  return (
    
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
      }}
    >
      <GlobalStyle/>
      <Section title="Phonebook">  
      <ContactForm onAddContact={addContact} />
      </Section>
      <Section title="Contacts">   
      <Filter value={filter} onChange={changeFilter}/>
      <ContactList
           contacts={getFilteredContacts()}
            onDelete={deleteContact}
          />
        </Section> 
     
    </Container>
  );
}
