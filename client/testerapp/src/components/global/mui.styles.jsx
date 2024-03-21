import styled from "@emotion/styled/macro";

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

export const H1Text = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const H2Text = styled.h2`
  text-align: center;
`;

export const PText = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export const SpanText = styled.span`
  font-size: 12px;
`;

export const AText = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const AuthButton = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
`;

export const MuiForm = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const MuiInput = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
`;

export const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
`;

export const SignInContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: 2;

  ${Container}.right-panel-active & {
    transform: translateX(100%);
  }
`;

export const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;

  ${Container}.right-panel-active & {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${Container}.right-panel-active & {
    transform: translateX(-100%);
  }
`;

export const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${Container}.right-panel-active & {
    transform: translateX(50%);
  }
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  &.overlay-left {
    transform: translateX(-20%);
  }

  ${Container}.right-panel-active &.overlay-left {
    transform: translateX(0);
  }

  &.overlay-right {
    right: 0;
    transform: translateX(0);
  }

  ${Container}.right-panel-active &.overlay-right {
    transform: translateX(20%);
  }
`;

export const SocialContainer = styled.div`
  margin: 20px 0;
`;

export const SocialLink = styled.a`
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
`;

export const Footer = styled.footer`
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;

  p {
    margin: 10px 0;
  }

  i {
    color: red;
  }

  a {
    color: #3c97bf;
    text-decoration: none;
  }
`;