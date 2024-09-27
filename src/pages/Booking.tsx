
import { Button } from "antd";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import PhInput from "../components/form/PhInput";
import PhForm from "../components/form/PhForm";
import { FieldValues, SubmitHandler } from 'react-hook-form';

const Booking: React.FC = () => {
  const user = useAppSelector(currentUser);
  const {  selectedSlot } = useAppSelector((state) => state.booking);
  const {selectedService :service} = useAppSelector((state) => state.booking);
 console.log(service)
 
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-500 text-white">
            <h2 className="text-3xl font-bold mb-4">Booking Summary</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Service: {service?.name}</h3>
              <p className="text-md mt-2">Duration: {service?.duration} mins</p>
              <p className="text-md">Price: ${service?.price}</p>
              <p className="text-md mt-4">{service?.description}</p>
            </div>
            <div className="border-t border-white my-6"></div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Selected Time Slot</h3>
              <p className="mt-2 text-md">
                {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your Details</h2>
            {user && (
              <PhForm onSubmit={onSubmit}>
                <div>
                  <PhInput
                    name="name"
                    label="Your Name"
                    type="text"
                    placeholder="Enter your name"
                    defaultValue={user?.name}
                  />
                </div>

                <div>
                  <PhInput
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    defaultValue={user?.email}
                  />
                </div>

                <div>
                  <PhInput
                    type="text"
                    label="Time Slot"
                    name="timeSlot"
                    placeholder="Time Slot"
                    defaultValue={`${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}
                  />
                </div>

                <div>
                  <Button
                    htmlType="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </PhForm>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
