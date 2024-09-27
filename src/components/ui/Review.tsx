/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";

import PhForm from "../form/PhForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

import ReviewCard from "./Card";
import { Link } from "react-router-dom";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetAllUserQuery } from "../../redux/features/user/userManagement.api";
import { useAddReviewMutation, useGetAllReviewsQuery } from "../../redux/features/user/userReview.api";
import { User } from "../../types/globalTypes";


const Review = () => {
  const user = useAppSelector(currentUser);
  const users = useGetAllUserQuery(undefined);
  console.log(users)
  const presentUser = users?.data?.data.find((item:User) => item.email === user?.email);
  const [addReview, ] = useAddReviewMutation();

  const handleSubmit : SubmitHandler<FieldValues>= (data) => {
    const reviewinfo = {
      name: presentUser?.name,
      description: data.description,
      ratting: data.ratting,
    };
    addReview(reviewinfo);
  };

  const { data: reviews } = useGetAllReviewsQuery(undefined);
  const { selectedService, selectedSlot } = useAppSelector((state) => state.booking);

  console.log('first',selectedService,selectedSlot)

  return (
    <>
      <div className="relative mt-4">
     
        <div className={`bg-white p-6 rounded-lg shadow-md h-[70vh] ${!user ? "opacity-30" : ""}`}>
          <h2 className="text-blue-700 text-2xl font-semibold mb-4 text-center">Customer Review</h2>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex-1 h-[calc(75vh-25vh)] w-full">
              <PhForm onSubmit={handleSubmit}>
                <div className="bg-white p-6 rounded-lg  h-full min-w-full">
                  <h2 className="text-2xl text-center text-blue-600 font-semibold mb-4">Share Your Experience</h2>
                  {/* Rating Heading */}
                  <label className="text-lg font-medium mb-2 block">Rate Us:</label>
                  <div className="flex items-center">
                    <Controller
                      name="ratting"
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item>
                          <Rate {...field} />
                          {error && <small style={{ color: 'red' }}>{error.message}</small>}
                        </Form.Item>
                      )}
                    />
                  </div>
                  {/* Feedback Heading */}
                  <label className="text-lg font-medium mb-2 block">Your Feedback</label>
                  <Controller
                    name="description"
                    render={({ field, fieldState: { error } }) => (
                      <Form.Item>
                        <TextArea {...field} />
                        {error && <small style={{ color: 'red' }}>{error.message}</small>}
                      </Form.Item>
                    )}
                  />
                  <Button
                    htmlType="submit"
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                  >
                    Submit Review
                  </Button>
                </div>
              </PhForm>
            </div>
            <div className="flex-1 h-[calc(75vh-25vh)]">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl text-center text-blue-600 font-semibold mb-4">Customer Experience</h2>
                <h1 className="text-2xl font-semibold mb-3">All Ratings: 80%</h1>
                <div className="grid grid-cols-2 gap-4">
                  {reviews?.data?.slice(0, 2).map((review:any, i:any) => (
                    <ReviewCard key={i} review={review}></ReviewCard>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  htmlType="submit"
                  className="mt-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                  See All
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for non-authenticated users */}
        {!user && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div className="p-8 rounded-lg shadow-lg text-center bg-white">
              <h2 className="text-3xl font-semibold mb-4">Login Required</h2>
              <p className="text-lg mb-4">Please log in to leave a review.</p>
              <Link to="/login"><Button
                htmlType="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
              >
                Login
              </Button></Link>
              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
