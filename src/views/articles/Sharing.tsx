import React, { useEffect } from "react";

// react-bootstrap components
import { useParams } from "react-router";
import Sharing1 from "./sub-sharing/Sharing1";

// core components

function Sharing() {
  let { id } = useParams();

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  },[])

  return (
    <>
      <div className="text-center mt-5">
        {id === '1' && <Sharing1></Sharing1>}
      </div>
    </>
  );
}

export default Sharing;
