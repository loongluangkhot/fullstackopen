import React from "react";

// const App = () => <div>hello webpack</div>;

const App = () => {
  const [message, setmessage] = useState("");

  useEffect(() => {
    const _ = async () => {
      await setmessage("hello webpack");
    };
    _();
  }, []);

  return <div>{message}</div>;
};

export default App;
