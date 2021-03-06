import React, { useEffect, useState } from 'react';
import styles from './travel_info.module.css';
import DatePicker from 'react-datepicker';

const TravelInfo = ({ updateTravel, travelInfo, editable }) => {
  const { title, place } = travelInfo;

  const [startDate, setStartDate] = useState(
    travelInfo.startDate && new Date(travelInfo.startDate)
  );
  const [endDate, setEndDate] = useState(
    travelInfo.endDate && new Date(travelInfo.endDate)
  );

  const onChange = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    event.preventDefault();
    updateTravel({
      ...travelInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    setStartDate(travelInfo.startDate && new Date(travelInfo.startDate));
    setEndDate(travelInfo.endDate && new Date(travelInfo.endDate));
  }, [travelInfo]);

  return (
    <ul className={styles['info-wrap']}>
      <li className={styles.info}>
        <input
          className={styles.input}
          name="title"
          value={title ? title : ''}
          placeholder="여행 이름"
          onChange={onChange}
          disabled={!editable}
        />
      </li>
      <li className={styles.info}>
        <input
          className={styles.input}
          name="place"
          value={place ? place : ''}
          placeholder="여행 장소"
          onChange={onChange}
          disabled={!editable}
        />
      </li>
      <li className={`${styles.info} ${styles.date}`}>
        <DatePicker
          wrapperClassName={styles['calendar-wrapper']}
          className={styles['calendar-input']}
          name="startDate"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            date &&
              updateTravel({
                ...travelInfo,
                startDate: date.toString(),
              });
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          placeholderText="시작일"
          disabled={!editable}
        />
        <p className={styles['date-deco']}>~</p>
        <DatePicker
          wrapperClassName={styles['calendar-wrapper']}
          className={styles['calendar-input']}
          name="endDate"
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            date &&
              updateTravel({
                ...travelInfo,
                endDate: date.toString(),
              });
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy/MM/dd"
          placeholderText="종료일"
          disabled={!editable}
        />
      </li>
    </ul>
  );
};
export default TravelInfo;
