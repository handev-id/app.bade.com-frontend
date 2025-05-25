import Button from "../../components/button/Button";
import HomeLayout from "./layout";

const Home = () => {
  return (
    <HomeLayout>
      <div className="p-5 w-[300px] rounded-md mx-auto mt-20 flex gap-6 bg-white shadow">
        <Button>Qris</Button>
        <Button variant="outlined">Tunai</Button>
      </div>
    </HomeLayout>
  );
};

export default Home;
