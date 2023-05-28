import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';
import { Btn, Item, List } from './ContactList.styled'
import { RiDeleteBin6Line } from 'react-icons/ri';

const getContacts = state => state.contacts.items;
const getFilter = state => state.filter;

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  if (!filteredContacts?.length) {
    return <Item>No contacts found.</Item>;
  }
    return (
  
        <List>
          {filteredContacts.map(({ id, name, number }) => {
             return (
            <Item key={id}>
              
                <p>{name}: </p>
                <p>{number}</p>
              <Btn type="button" onClick={() => onDeleteContact(id)}>
              <RiDeleteBin6Line size="16" />
              </Btn>
            </Item>
             )
          })}
          
        </List>
      );
};  