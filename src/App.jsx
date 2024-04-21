/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState();
  const passwordInputRef = useRef(null);

  const passwordgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (charallow) str += "!@#$%^&*()_+~-{}:";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, number, charallow, setpassword]);

  const passwordcopy = useCallback(() => {
    passwordInputRef.current?.select();
    passwordInputRef.current?.setSelectionRange(0, 101);
    navigator.clipboard.writeText(password);
    alert("Password Copied *********");
  }, [password]);

  useEffect(() => {
    passwordgen();
  }, [length, number, charallow, passwordgen]);

  return (
    <>
      <div className="container w-full h-screen flex-col justify-center items-center flex bg-gradient">
        <div className="shadow-xxl main flex flex-wrap flex-col text-center bg-gray-700 rounded-2xl text-white  p-5 bg-gradient gradient-background">
          <h1 className="text-4xl">Password Generator</h1>
          <div className="password flex flex-wrap items-center justify-center gap-2 mt-8 ">
            <input
              type="text"
              value={password}
              placeholder="password"
              readOnly
              name="text"
              id=""
              ref={passwordInputRef}
              className="  rounded-lg h-12 w-96  border-black border-2 text-black"
            />
            <button
              className=" hover:bg-blue-300 w-24 p-2 text-center rounded-lg h-12 border-white border-2 "
              onClick={passwordcopy}
            >
              Copy
            </button>
          </div>
          <div className="dependices flex-wrap flex gap-5  mt-4 p-2 px-2 justify-center items-center max-w-2xl">
            <label htmlFor="range">
              Length({length}):{" "}
              <input
                type="range"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
                className="cursor-pointer"
                name="char"
                id=""
                min={8}
                max={100}
                value={length}
              />
            </label>

            <label htmlFor="number">
              NumberAllow:{" "}
              <input
                type="checkbox"
                name="number"
                className="cursor-pointer   h-4 w-4 rounded-full shadow"
                id=""
                checked={number}
                onChange={() => setnumber((prev) => !prev)}
              />
            </label>
            <label htmlFor="char">
              CharAllow:{" "}
              <input
                type="checkbox"
                className="cursor-pointer h-4 w-4 rounded-full shadow "
                name="char"
                checked={charallow}
                onChange={() => setcharallow((prev) => !prev)}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
