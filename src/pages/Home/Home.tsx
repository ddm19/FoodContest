import CustomButton from "components/customButton/customButton";
import "./Home.scss";


const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to the Food Contest Voting App</h1>
      <div className="home__buttonContainer">
        <CustomButton variant="text" color="primary" className="home__sectionButton" onClick={() => { console.log("test") }} >
          Click Me
        </CustomButton>
        <CustomButton variant="text" color="primary" className="home__sectionButton" onClick={() => { console.log("test") }} >
          Click Me
        </CustomButton>



      </div>

    </div>
  );
}


export default Home;
