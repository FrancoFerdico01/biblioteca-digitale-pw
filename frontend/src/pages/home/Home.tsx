import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Wrapper from '../../components/wrapper/Wrapper';
import events from '../../data/events.json';
import books from '../../data/books.json';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
       <Filter />
       <Wrapper
        subtitle="Calendario culturale aperto"
        title="Eventi e Visite Disponibili"
        description="Prenotazione online immediata e gratuita per tutti gli eventi e le visite disponibili."
        items={events}
        renderItem={(event) => (
          <Card
            key={event.id}
            image={event.image}
            duration={event.durations}
            title={event.title}
            description={event.description}
            available_places={event.available_places}
            location={event.location}
            date={event.date}
            btnTextCard="Prenota Posto"
          />
        )}
      />
      <Wrapper
        subtitle="Prestiti immediati - sede centrale"
        title="In Evidenza dal Catalogo"
        description="Titoli più richiesti della settimana, ritirabili al banco prestito in giornata."
        items={books}
        renderItem={(book) => (
          <Card
            key={book.id}
            image={book.image}
            duration={book.genre}
            title={book.title}
            description={book.author}
            available_books={book.available_books}
            location={book.location}
          />
        )}
      />
      </div>
    </div>
  );
};

export default Home;