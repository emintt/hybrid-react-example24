import { useState } from "react";

const useForm = (callback: () => void, initState: Record<string, string>) => {
  const [inputs, setInputs] = useState(initState);

  // riipuvainen siitä mitä annamme usefromille parametri
  const handleSubmit = (event: React.SyntheticEvent) => {
      if (event) {
          event.preventDefault();
      }
      callback();
  };
  // päivitä inputti
  // khi xu ly nhung tt o input kenttä, set input de no lay nykyiset srvot, set va destructoi va them vao elemntti ma minhdang xu ly thong qua event target
  // khi kenttä thay doi, handle inputchange dc goi va update, setinput: them vao input moi
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.persist();
      console.log(event.target.name, event.target.value);
      setInputs((inputs) => ({
          ...inputs,
          [event.target.name]: event.target.value,
      }));
  };
  // palauta nguyen trinh xu ly fomt, trinh xu ly nhung input, va stae cuat inputs tuc la input moi nhat
  return {
      handleSubmit,
      handleInputChange,
      inputs,
  };
};

export {useForm};
