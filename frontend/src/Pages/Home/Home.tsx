import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center">
      <Link to="/auth/signin">
        <button
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          Signin
        </button>
      </Link>
    </div>
  );
};

export default Home;
