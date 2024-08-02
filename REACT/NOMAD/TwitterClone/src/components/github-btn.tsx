import { signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      Continue with Github
    </Button>
  );
}

const Button = styled.span`
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 25px;
`;
