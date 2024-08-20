import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css"

export default function Home() {

  return (
    <>
      <div>

        <Stack direction={"row"} justifyContent={"end"} sx={{mx: 5,my: 2}} >
          <Link to="/login" className="login">login</Link>
          <Link to="/signup" className="signup">Sign Up</Link>
        </Stack>
      </div>
    </>
  );
}
