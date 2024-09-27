
import { useGetMyBookingsQuery } from "../../redux/features/user/bookingApi";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, Col, Row } from 'antd';

// Define types for slot and service
interface Slot {
  date: string;
  startTime: string;
  endTime: string;
}

interface IBooking {
  key: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface Booking {
  _id: string;
  serviceId: {
    name: string;
  };
  slotId: Slot;
}

// Define props for CountdownTimer
interface CountdownTimerProps {
  date: string;
  endTime: string;
}

// Countdown Timer Component
const CountdownTimer: React.FC<CountdownTimerProps> = ({ date, endTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = moment();

      // Combine date and endTime into a valid moment object
      const endDateTime = moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm');

      const duration = moment.duration(endDateTime.diff(now));

      if (duration.asSeconds() <= 0) {
        setTimeRemaining("Time's up!");
      } else {
        setTimeRemaining(`${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
      }
    };

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval
  }, [date, endTime]);

  return <div>{timeRemaining}</div>;
};

// UpcomingBookings Component
const UpcomingBookings: React.FC = () => {
  const { data } = useGetMyBookingsQuery(undefined);
  
  // Updated state type to IBooking[]
  const [upcomingBookings, setUpcomingBookings] = useState<IBooking[]>([]);
  const [nextSlot, setNextSlot] = useState<Slot | null>(null); // For the immediate next slot countdown in the navbar

  useEffect(() => {
    if (data?.data?.result) {
      const futureBookings = data.data.result.filter(({ slotId }: Booking) => {
        if (!slotId || !slotId.date || !slotId.endTime) return false;

        const slotEndTime = moment(`${slotId.date} ${slotId.endTime}`, 'YYYY-MM-DD HH:mm');
        return slotEndTime.isAfter(moment()); // Return only future bookings
      });

      // Sort bookings by start time to find the next immediate slot
      const sortedBookings = futureBookings.sort((a: Booking, b: Booking) =>
        moment(`${a.slotId.date} ${a.slotId.startTime}`, 'YYYY-MM-DD HH:mm').diff(
          moment(`${b.slotId.date} ${b.slotId.startTime}`, 'YYYY-MM-DD HH:mm')
        )
      );

      // Set the next immediate booking slot
      if (sortedBookings.length > 0) {
        setNextSlot(sortedBookings[0].slotId);
      }

      // Map bookings for card display
      const mappedBookings = sortedBookings.map(({ _id, serviceId, slotId }:Booking): IBooking => ({
        key: _id,
        name: serviceId.name,
        date: slotId.date,
        startTime: moment(slotId.startTime, 'HH:mm').format('HH:mm'),
        endTime: slotId.endTime,
      }));

      setUpcomingBookings(mappedBookings);
    }
  }, [data]);

  console.log(upcomingBookings);

  return (
    <div>
      {/* Navbar Countdown Timer for Immediate Next Slot */}
      {nextSlot && (
        <div className="navbar-countdown">
          <h3>Next Slot Starts In:</h3>
          <CountdownTimer date={nextSlot.date} endTime={nextSlot.startTime} />
        </div>
      )}
 
      {/* Displaying Upcoming Bookings in Card Format */}
      <Row gutter={16}>
        {upcomingBookings.map((booking) => (
          <Col key={booking.key} span={8}>
            <Card title={booking.name} bordered={true}>
              <p>Date: {booking.date}</p>
              <p>Start Time: {booking.startTime}</p>
              <p>
                Time Remaining: <CountdownTimer date={booking.date} endTime={booking.endTime} />
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UpcomingBookings;
