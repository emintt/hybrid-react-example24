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
  // khi xu ly nhung tt o input kenttä, set input de no lay gia tri hien tai,
  //  set va destructoi va them vao elemntti ma minh dang xu ly thong qua event target
  // khi kenttä thay doi, handle inputchange dc goi va update, setinput: them vao input moi
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.persist();
      // console.log(event.target.name, event.target.value);
      // ...inputs tao 1 object moi bao gom tat ca nhung phan tu cua inputs, them vao hoac update
      // phan tu co ten event.target.name voi gia tri la event target value
      setInputs((inputs) => ({
        ...inputs,
        [event.target.name]: event.target.value,
      }));
  };
  // palauta nguyen trinh xu ly form, trinh xu ly nhung input,
  // va state cuat inputs tuc la input moi nhat
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export {useForm};
