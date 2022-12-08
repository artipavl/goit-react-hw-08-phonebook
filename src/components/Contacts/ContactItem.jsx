import PropTypes from 'prop-types';
import css from 'components/Contacts/ContactList.module.css';

import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations/deleteContact';

export const ContactItem = ({ contact }) => {
  const { name, phone, id } = contact;

  const dispatch = useDispatch();

  const onButtonClick = async (e, id) => {
    const button = e.target;
    button.disabled = true;
    try {
      await dispatch(deleteContact(id));
      button.disabled = false;
    } catch (error) {
      console.log(error)
      button.disabled = false;
    }
    
  };

  return (
    <li className={css.item}>
      {name}: {phone}
      <button
        type="button"
        onClick={e => onButtonClick(e, id)}
        className={css.button}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
