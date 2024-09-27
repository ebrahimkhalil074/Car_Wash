import { useEffect, useState } from "react";
import { format, addDays } from 'date-fns';
import { useNavigate, useParams } from "react-router-dom";
import { useGetAvailableSlotsQuery, useGetSingleServiceQuery } from "../../redux/features/user/servicesApi";
import { useAppDispatch } from "../../redux/hooks";
import { setBookingDetails,} from "../../redux/features/booking/bookingSlice";



// Define the structure for the Slot data
interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'booked' | 'available'|'canclled';
}

// Define the structure for the Service


const ServicesDetails: React.FC = () => {
  const { id: serviceId } = useParams<{ id: string }>();
const {data}= useGetSingleServiceQuery(serviceId)
  console.log(data)
  const service = data?.data
  
  // Fetch available slots for the service
  const { data: slots } = useGetAvailableSlotsQuery([{ name: 'service', value: serviceId }]);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  // Filter slots for the selected date
  useEffect(() => {
    const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
    const availableSlots = slots?.data?.result?.filter((slot: Slot) => slot.date === selectedDateString);
    setFilteredSlots(availableSlots || []);
  }, [selectedDate, slots]);
  
  // Check if a slot is booked
  const isBooked = (slot: Slot) => slot.isBooked === 'booked';
  
  // Handle slot selection
  const handleSlotSelection = (slot: Slot) => {
    if (!isBooked(slot)) {
      setSelectedSlot(slot);
    }
  };
  
  // Format date to a readable string
  const formatDate = (date: Date) => format(date, 'eeee, MMMM do, yyyy');
  
  // Handle booking
  const handleBooking = () => {
    if (selectedSlot && service) {
      dispatch(setBookingDetails(
        { service:{
          _id:service._id,
          serviceId:service._id,
          name: service.name,
          date: service.date,
          price: service.price,
          duration: service.duration,
          description: service.description
        }, slot: selectedSlot }
      ));
      navigate('/booking');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Service Information */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{service?.name}</h1>
        <h2 className="text-lg text-gray-600">Price: ${service?.price}</h2>
        <h3 className="text-md text-gray-500">Duration: {service?.duration} mins</h3>
        <p className="mt-2 text-gray-700">{service?.description}</p>
      </div>

      {/* Date Picker */}
      <div className="flex justify-between items-center my-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => setSelectedDate(addDays(selectedDate, -1))}
        >
          Previous Day
        </button>
        <div className="text-gray-800 font-semibold">{formatDate(selectedDate)}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
        >
          Next Day
        </button>
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-3 gap-4 my-4">
        {filteredSlots?.length ? (
          filteredSlots.map((slot: Slot) => (
            <button
              key={slot._id}
              disabled={isBooked(slot)}
              className={`px-4 py-2 rounded-md border ${
                isBooked(slot)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } ${selectedSlot && selectedSlot._id === slot._id ? 'ring-2 ring-blue-300' : ''}`}
              onClick={() => handleSlotSelection(slot)}
            >
              {slot.startTime} - {slot.endTime} {isBooked(slot) && '(Booked)'}
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No slots available for this date.</p>
        )}
      </div>

      {/* Book Button */}
      {selectedSlot && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
            onClick={handleBooking}
          >
            Book This Service at {selectedSlot.startTime} - {selectedSlot.endTime}
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesDetails;
