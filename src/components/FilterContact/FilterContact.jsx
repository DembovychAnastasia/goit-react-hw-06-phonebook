// import React from 'react';
import { Label, Input } from './FilterContact.styled';

import { setFilter } from 'redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selector';


export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        value={filter}
        onChange={event => dispatch(setFilter(event.target.value.trim()))}
      />
    </Label>
  );
};