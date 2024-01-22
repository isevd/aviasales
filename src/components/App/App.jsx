import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { setTickets } from '../../store/ticketsSlice';
import Transfers from '../Transfers/Transfers';
import TicketType from '../TicketType/TicketType';
import { aviasalesService } from '../../services/AviasalesService';
import TicketsList from '../TicketsList/TicketsList';
import logo from '../../assets/Logo.svg';

import style from './App.module.scss';

const App = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const transferFilter = useSelector((state) => state.filters.transferFilter);
  const costFilter = useSelector((state) => state.filters.costFilter);
  const [displayedTickets, setDisplayedTickets] = useState(5);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const filterTickets = () => {
    const filteredTickets = tickets.filter((ticket) => {
      for (let segment of ticket.segments) {
        if (segment.stops.length === 0 && transferFilter.withoutTransfer) {
          return ticket;
        }
        if (segment.stops.length === 1 && transferFilter.oneTransfer) {
          return ticket;
        }
        if (segment.stops.length === 2 && transferFilter.twoTransfer) {
          return ticket;
        }
        if (segment.stops.length === 3 && transferFilter.threeTransfer) {
          return ticket;
        }
      }
    });

    return filteredTickets;
  };

  const sortTickets = (ticketsToSort) => {
    if (costFilter === 'cheapest') {
      return ticketsToSort.sort((a, b) => a.price - b.price);
    }
    if (costFilter === 'fastest') {
      return ticketsToSort.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
    }
    if (costFilter === 'optimal') {
      return [];
    }
  };

  const setTicketsLocal = (payload) => dispatch(setTickets(payload));

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await aviasalesService.getTickets();
        setTicketsLocal(response.tickets);
        if (!response.stop) {
          fetchTickets();
        } else {
          setLoaded(true);
        }
      } catch (error) {
        if (error.message == 500) {
          fetchTickets();
        } else {
          throw error;
        }
      }
    };

    aviasalesService.getSearchId().then(() => {
      fetchTickets();
    });
  }, []);

  const showMoreTickets = () => {
    setDisplayedTickets((prevState) => prevState + 5);
  };

  return (
    <div className={style.app}>
      <div className={style.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.main}>
        <Transfers />
        <section className={style.content}>
          <TicketType />
          {!loaded && <div className={style.loading}></div>}
          {filterTickets().length > 0 && (
            <TicketsList tickets={sortTickets(filterTickets()).slice(0, displayedTickets)} />
          )}
          {sortTickets(filterTickets()).length > 0 ? (
            <button onClick={showMoreTickets}> показать ещё 5 билетов! </button>
          ) : (
            <span className={style.nothing}>Рейсов, подходящих под заданные фильтры, не найдено</span>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
