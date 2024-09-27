import Banner from "../components/ui/Home/Banner";
import HomeService from "../components/ui/Home/HomeService";
import Review from "../components/ui/Review";



const Home = () => {
  return (
    <div>
      <Banner></Banner>
     <HomeService></HomeService>
      <Review></Review>
    </div>
  );
};

export default Home;