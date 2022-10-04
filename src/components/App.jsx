import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './App.module.css'

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  
  const addContact = (newContact) => {
    const { name } = newContact;
    const normalizedNameNewContract = name.toLowerCase();
    const contactNames = contacts.map(contact => {
      const contactName = contact.name;
      return contactName.toLowerCase()
    })
    if (contactNames.includes(normalizedNameNewContract)) {
      return alert(`${name} is already in contacts.`)
    }
    
    setContacts(prevState => [...prevState, newContact])
  }

  const removeContact = (id) => {
    setContacts(prevState => {
      const newContacts = prevState.filter((item) => item.id !== id)
      return newContacts
    })
  }

  const handleChange = event => {
    setFilter(event.currentTarget.value);
  }

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      return normalizedName.includes(normalizedFilter);
    })

    return filteredContacts;
  }

    return <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      
      <ContactForm onSubmit={addContact} />

      <h2 className={css.title}>Contacts</h2>

      <Filter filter={filter} onChange={handleChange} />
      
      <ContactList contacts={getFilteredContacts()} removeContact={removeContact} />
      
    </div>

}

export default App