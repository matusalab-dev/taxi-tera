import Button from "../components/Button";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 mt-24 text-center">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">404 Not Found</h1>
        <p>Your visited page not found. You may go home page.</p>
      </div>
      <Button
        as="Link"
        to="/"
        size="lg"
        color="teal"
        className="lowercase hover:text-white/90"
        children="back to home"
      />
    </section>
  );
};

export default NotFound;
