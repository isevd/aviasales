import { useDispatch } from 'react-redux';

import { setCostFilter } from '../../store/filtersSlice';

import styles from './TicketType.module.scss';
const TicketType = () => {
  const filters = [
    { label: 'САМЫЙ ДЕШЕВЫЙ', cost: 'cheapest' },
    { label: 'САМЫЙ БЫСТРЫЙ', cost: 'fastest' },
    { label: 'ОПТИМАЛЬНЫЙ', cost: 'optimal' },
  ];

  const dispatch = useDispatch();
  const setFilter = (payload) => dispatch(setCostFilter(payload));

  return (
    <ul className={styles.tabs}>
      {filters.map((filter) => {
        return (
          <li key={filter.cost}>
            <label>
              <input
                defaultChecked={filter.cost === 'cheapest'}
                type="radio"
                name="ticket-type"
                onChange={() => setFilter({ cost: filter.cost })}
              />
              <span>{filter.label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default TicketType;
