import CustomButton from "components/customButton/customButton";
import "./Home.scss";
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to the Food Contest Voting App</h1>
      <div className="home__buttonContainer">
        <CustomButton variant="text" color="primary" className="home__sectionButton" onClick={() => { navigate('/raffle ') }} >
          SORTEO DE COLORES
        </CustomButton>
        <CustomButton variant="text" color="primary" className="home__sectionButton" onClick={() => { navigate('/poll ')}} >
          VOTACIONES
        </CustomButton>
      </div>

    </div>
  );
}


export default Home;
