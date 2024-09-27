/* eslint-disable @typescript-eslint/no-explicit-any */


const ReviewCard = ({review}:{review:any}) => {
  return (
    <div className="flex justify-center items-center ">
      
  <div>
  <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="h-[50px] w-[50px] mx-auto rounded-full"  alt="img"/>
  <h1 className="text-center">{review.name}</h1>
  <p className="text-center">{review.description.slice(0,100)}...</p>
  </div>
    </div>
  );
};

export default ReviewCard;