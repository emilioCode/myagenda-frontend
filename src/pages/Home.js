import { Button } from "reactstrap";

const Home = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">React-Agenda!</h1>
      <p className="lead">
        This is a simple agenda built with React.js and .NET 6.
      </p>
      <hr className="my-4" />
      <p>It uses bootstrap, reactstrap, react router and axios.</p>
      <p className="lead">
        <Button
          color="primary"
          size="lg"
          tag="button"
          href="https://github.com/emilioCode/myagenda-frontend"
        >
          Learn More
        </Button>
      </p>
    </div>
  );
};

export default Home;
