import CustomButton from "components/customButton/customButton";
import "./Home.scss";
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Bienvenidos a La Velada de colorines 2025</h1>
      <div className="home__buttonContainer">
        <CustomButton variant="text" color="primary" className="home__sectionButton" onClick={() => { }} >
          Votar
        </CustomButton>
        <CustomButton variant="text" color="primary" className="home__sectionButton" onClick={() => { navigate('/raffle ') }} >
          SORTEO DE COLOR
        </CustomButton>
      </div>

    </div>
  );
}


export default Home;
