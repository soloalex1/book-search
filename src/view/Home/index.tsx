import Footer from "../../components/footer";
import Shelves from "../../components/shelves";
import {
  footerAllrightsReserved,
  helpLink,
  privacyAndPolicy,
  termsAndUsage,
} from "../../constants";

const Home: React.FC = () => {
  return (
    <>
      <Shelves />
      <Footer
        text={footerAllrightsReserved}
        privacyText={privacyAndPolicy}
        termsAndUsageText={termsAndUsage}
        helpText={helpLink}
      />
    </>
  );
};

export default Home;
