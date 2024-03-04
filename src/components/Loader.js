import React, { useState, CSSProperties } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import PublicLayout from '../Layout/PublicLayout';
// import {useAuth} from "../contextAPI/auth";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = ({isLoading}) => {
  // const {isLoading} = useAuth();
  let [color, setColor] = useState("#ffffff");
  
  return (
      <PublicLayout>
        <div className="sweet-loading">
          
          <ClipLoader
            color={color}
            loading={isLoading}
            css={override} // Corrected from cssOverride to css
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        </PublicLayout>
  )
}

export default Loader;
