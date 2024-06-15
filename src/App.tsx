import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

type DataT = {
  email: string;
  id: number;
  name: string;
  avatar: string;
  city: string;
};

let pg = 1;

export default function App() {
  const [data, setData] = useState<DataT[]>([]);

  const eleRef = useRef(null);

  async function fetchData() {
    const resp = await axios(
      `https://622334803af069a0f99cca61.mockapi.io/auth?limit=10&page=${pg}`
    );
    console.log(resp.data);
    setData((prev) => [...prev, ...resp.data]);
  }

  const intersectionCallback = (entries: any) => {
    if (entries[0].isIntersecting) {
      // console.log(elem);
      if (entries[0].intersectionRatio >= 0.75) {
        // intersectionCounter++;

        pg += 1;
        fetchData();

        // setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      // threshold: 1.0
    };

    let observer = new IntersectionObserver(intersectionCallback, options);

    if (eleRef.current) {
      observer.observe(eleRef.current);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="cont">
        {data.map((user, index) => {
          return (
            <div className="" key={index}>
              <div className="user-cont">
                <div className="img-cont">
                  <img className="img" src={user.avatar} alt="" srcSet="" />
                </div>
                <div className="user-data">
                  <p>{user.id}</p>
                  <p>{user.email}</p>
                  <p>{user.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={eleRef} id="scrollArea"></div>
    </div>
  );
}
