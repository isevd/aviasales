import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { message } from 'antd';

import Transfers from '../Transfers/Transfers';
import TicketType from '../TicketType/TicketType';
import TicketsList from '../TicketsList/TicketsList';
import { fetchId, fetchTicketsData, fetchStatus, searchId } from '../../store/ticketsSlice';
import { sortTickets } from '../../utils/sortTickets';
import { filterTickets } from '../../utils/filterTickets';
import { fetchError } from '../Error/Error';
import logo from '../../assets/Logo.svg';

import style from './App.module.scss';

const App = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const transferFilter = useSelector((state) => state.filters.transferFilter);
  const costFilter = useSelector((state) => state.filters.costFilter);
  const id = useSelector(searchId);
  const status = useSelector(fetchStatus);
  const [messageApi, contextHolder] = message.useMessage();
  const [displayedTickets, setDisplayedTickets] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchId());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketsData(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (status === 'rejected') {
      fetchError(messageApi);
    }
  }, [status]);

  const filteredTickets = useMemo(() => {
    return filterTickets(tickets, transferFilter);
  }, [transferFilter, tickets]);

  const sortedTickets = useMemo(() => {
    return sortTickets(filteredTickets, costFilter);
  }, [costFilter, filteredTickets]);

  const showMoreTickets = () => {
    setDisplayedTickets((prevState) => prevState + 5);
  };

  return (
    <div className={style.app}>
      {contextHolder}
      <div className={style.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.main}>
        <Transfers />
        <section className={style.content}>
          <TicketType />
          {status === 'loading' && <div className={style.loading}></div>}
          {filteredTickets.length > 0 && <TicketsList tickets={sortedTickets.slice(0, displayedTickets)} />}
          {sortedTickets.length > 0 ? (
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
