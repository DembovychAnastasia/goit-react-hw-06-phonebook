import { GlobalStyle } from "./GlobalStyle";
import { Section } from "./Section/Section";
import { Container } from "./Container";
import {ContactForm} from "./FormContact/FormContact";
import { ContactList } from "./ContactList/ContacttList";
import { Filter } from "./FilterContact/FilterContact";


export const App = () => {
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
      <ContactForm  />
      </Section>
      <Section title="Contacts">   
      <Filter/>
      <ContactList/>
        </Section> 
     
    </Container>
  );
}
