import styles from "../../styles/calendar.module.css";
import { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
  subDays,
} from "date-fns";

import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCalendar,
} from "react-icons/ai";
const meetings = [
  {
    name: "REC Change Panel",
    startTime: "Mon Mar 21 2022 10:00:00 GMT+0100 (British Summer Time)",
    endTime: "Mon Mar 21 2022 12:00:00 GMT+0100 (British Summer Time)",
    attendees: [1, 7, 11, 193],
  },
  {
    name: "REC Metering Expert Panel",
    startTime: "Wed Mar 30 2022 10:00:00 GMT+0100 (British Summer Time)",
    endTime: "Wed Mar 30 2022 12:00:00 GMT+0100 (British Summer Time)",
    attendees: [1, 7, 11, 193],
  },
  {
    name: "March 2022 Technical Expert Panel",
    startTime: "Thu Mar 31 2022 10:00:00 GMT+0100 (British Summer Time)",
    endTime: "Thu Mar 31 2022 12:00:00 GMT+0100 (British Summer Time)",
    attendees: [1, 7, 11, 193],
  },
  {
    name: "Test Second Meeting on same day",
    startTime: "Thu Mar 31 2022 13:00:00 GMT+0100 (British Summer Time)",
    endTime: "Thu Mar 31 2022 13:30:00 GMT+0100 (British Summer Time)",
    attendees: [1, 7, 11, 193],
  },
  {
    name: "REC Change Panel",
    startTime: "Wed Apr 20 2022 10:00:00 GMT+0100 (British Summer Time)",
    endTime: "Wed Apr 20 2022 12:00:00 GMT+0100 (British Summer Time)",
    attendees: [1, 7, 11, 193],
  },
  {
    name: "REC Metering Expert Panel",
    startTime: "Mon Apr 18 2022 10:00:00 GMT+0100 (British Summer Time)",
    endTime: "Mon Apr 18 2022 12:00:00 GMT+0100 (British Summer Time)",
    attendees: [1, 7, 11, 193],
  },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  const getHeader = () => {
    return (
      <div className={styles.calenderHeader}>
        <div
          className={styles.todayButton}
          onClick={() => {
            setSelectedDate(new Date());
            setActiveDate(new Date());
          }}
        >
          Today
        </div>
        <AiOutlineLeft
          className={styles.navIcon}
          onClick={() => setActiveDate(subMonths(activeDate, 1))}
        />
        <AiOutlineRight
          className={styles.navIcon}
          onClick={() => setActiveDate(addMonths(activeDate, 1))}
        />
        <p className={styles.currentMonth}>{format(activeDate, "MMMM yyyy")}</p>
      </div>
    );
  };

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div key={day} className={`${styles.day} ${styles.weekNames}`}>
          {format(addDays(weekStartDate, day), "E")}
        </div>
      );
    }
    return <div className={styles.weekContainer}>{weekDays}</div>;
  };

  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date;
    const week = [];

    for (let day = 1; day < 8; day++) {
      const cloneDate = currentDate;
      const daysMeetings = meetings.filter(
        (meeting) =>
          format(Date.parse(meeting.startTime), "dd MM yyyy") ==
          format(cloneDate, "dd MM yyyy")
      );

      const subAmount = 8 - day;
      const newAlteredDate = addDays(subDays(cloneDate, subAmount), subAmount);
      week.push(
        <div
          key={cloneDate}
          className={`${styles.day} ${
            isSameMonth(currentDate, activeDate) ? "" : styles.inactiveDay
          } ${isSameDay(currentDate, selectedDate) ? styles.selectedDay : ""}
          ${isSameDay(currentDate, new Date()) ? styles.today : ""}`}
          onClick={(e) => {
            setSelectedDate(newAlteredDate);
          }}
        >
          {format(currentDate, "d")}
          {daysMeetings.length > 0 ? (
            <AiOutlineCalendar className={styles.eventNote} />
          ) : (
            ""
          )}
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        generateDatesForCurrentWeek(
          addDays(currentDate, 1),
          selectedDate,
          activeDate
        )
      );
      currentDate = addDays(currentDate, 7);
    }

    return <div className={styles.weekContainer}>{allWeeks}</div>;
  };

  const getSelectedDateEvents = () => {
    const daysMeetings = meetings.filter(
      (meeting) =>
        format(Date.parse(meeting.startTime), "dd MM yyyy") ==
        format(selectedDate, "dd MM yyyy")
    );
    if (daysMeetings.length > 0) {
      return (
        <div className={styles.eventHolder}>
          <h4 className={styles.eventTitle}>
            The events for {format(Date.parse(selectedDate), "dd/MM/yyyy")} are:
          </h4>
          <ul>
            {daysMeetings.map((meeting, index) => (
              <li className={styles.meetingList} key={index}>
                {meeting.name} @{" "}
                {format(Date.parse(meeting.startTime), "dd/MM/yyyy hh:mm")} to{" "}
                {format(Date.parse(meeting.endTime), "hh:mm")}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className={styles.eventHolder}>
          <p>No Event today</p>
        </div>
      );
    }
  };

  return (
    <section className={styles.calendarHolder}>
      {getHeader()}
      {getWeekDaysNames()}
      {getDates()}
      {getSelectedDateEvents()}
    </section>
  );
};

export default Calendar;
