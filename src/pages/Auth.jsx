import { useMemo, useState } from "react";
import styled from "styled-components";
import { FiMail, FiLock, FiUser, FiMapPin, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  padding: 0 0 60px;
`;

const Hero = styled.section`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.teal}, ${({ theme }) => theme.colors.primary});
  padding: 38px 0 60px;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 22px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled.div`
  color: white;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 46px;
  line-height: 1.08;

  @media (max-width: 600px) {
    font-size: 36px;
  }
`;

const Sub = styled.p`
  margin: 12px 0 0;
  opacity: 0.92;
  max-width: 520px;
  line-height: 1.7;
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 18px;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const CardSub = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

const Tabs = styled.div`
  display: flex;
  background: #f1f5f9;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 4px;
  margin-top: 12px;
`;

const Tab = styled.button`
  flex: 1;
  border: none;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 900;
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.muted)};
`;

const Label = styled.label`
  display: block;
  margin: 14px 0 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 900;
`;

const RoleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 8px;
`;

const RoleCard = styled.button`
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ $active }) => ($active ? "#E9FBF1" : "#fff")};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px;
  cursor: pointer;
  text-align: left;
  display: grid;
  gap: 6px;
  font-weight: 900;

  span:last-child {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 700;
  }
`;

const Form = styled.form`
  margin-top: 12px;
`;

const Field = styled.div`
  margin-top: 12px;
`;

const InputWrap = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 10px;
  align-items: center;
  background: #f8fafc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 12px;
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  font-size: 14px;
`;

const ToggleBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const Submit = styled.button`
  width: 100%;
  margin-top: 14px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  margin: 12px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`;

const SwitchLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 900;
  cursor: pointer;
`;

const Hint = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | signup
  const [role, setRole] = useState("seller"); // seller | recycler
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const onChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const canSubmit = useMemo(() => {
    if (!form.email || !form.password) return false;
    if (isSignup) {
      if (!form.fullName || !form.phone || !form.location) return false;
      if (!form.confirmPassword) return false;
      if (form.password !== form.confirmPassword) return false;
    }
    return true;
  }, [form, isSignup]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now: UI-only (we will connect axios + context after all screens are done)
    if (role === "seller") navigate("/seller/dashboard");
    if (role === "recycler") navigate("/recycler/portal");
  };

  return (
    <Page>
      <Hero>
        <Container>
          <Grid>
            <HeroText>
              <Title>Transform waste into wealth.</Title>
              <Sub>
                Join the revolution. Connect sellers and recyclers across Nigeria. Earn money, reduce pollution, and get rewarded.
              </Sub>
            </HeroText>

            <Card>
              <CardBody>
                <CardTitle>Get Started</CardTitle>
                <CardSub>Create your account or sign in to continue</CardSub>

                <Tabs>
                  <Tab type="button" $active={mode === "login"} onClick={() => setMode("login")}>
                    Login
                  </Tab>
                  <Tab type="button" $active={mode === "signup"} onClick={() => setMode("signup")}>
                    Sign Up
                  </Tab>
                </Tabs>

                <Label>I want to...</Label>
                <RoleRow>
                  <RoleCard type="button" $active={role === "seller"} onClick={() => setRole("seller")}>
                    <span>Seller</span>
                    <span>Sell waste materials</span>
                  </RoleCard>

                  <RoleCard type="button" $active={role === "recycler"} onClick={() => setRole("recycler")}>
                    <span>Recycler</span>
                    <span>Buy raw materials</span>
                  </RoleCard>
                </RoleRow>

                <Form onSubmit={handleSubmit}>
                  {isSignup && (
                    <>
                      <Field>
                        <Label>Full Name</Label>
                        <InputWrap>
                          <Icon><FiUser /></Icon>
                          <Input value={form.fullName} onChange={onChange("fullName")} placeholder="John Doe" />
                          <span />
                        </InputWrap>
                      </Field>

                      <Field>
                        <Label>Phone Number</Label>
                        <InputWrap>
                          <Icon><FiPhone /></Icon>
                          <Input value={form.phone} onChange={onChange("phone")} placeholder="+234..." />
                          <span />
                        </InputWrap>
                      </Field>

                      <Field>
                        <Label>Location</Label>
                        <InputWrap>
                          <Icon><FiMapPin /></Icon>
                          <Input value={form.location} onChange={onChange("location")} placeholder="e.g., Ikeja, Lagos" />
                          <span />
                        </InputWrap>
                      </Field>
                    </>
                  )}

                  <Field>
                    <Label>Email</Label>
                    <InputWrap>
                      <Icon><FiMail /></Icon>
                      <Input value={form.email} onChange={onChange("email")} placeholder="you@email.com" />
                      <span />
                    </InputWrap>
                  </Field>

                  <Field>
                    <Label>Password</Label>
                    <InputWrap>
                      <Icon><FiLock /></Icon>
                      <Input
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={onChange("password")}
                        placeholder="********"
                      />
                      <ToggleBtn type="button" onClick={() => setShowPass((s) => !s)} aria-label="Toggle password">
                        {showPass ? <FiEyeOff /> : <FiEye />}
                      </ToggleBtn>
                    </InputWrap>
                  </Field>

                  {isSignup && (
                    <Field>
                      <Label>Confirm Password</Label>
                      <InputWrap>
                        <Icon><FiLock /></Icon>
                        <Input
                          type={showConfirm ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={onChange("confirmPassword")}
                          placeholder="********"
                        />
                        <ToggleBtn type="button" onClick={() => setShowConfirm((s) => !s)} aria-label="Toggle confirm password">
                          {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </ToggleBtn>
                      </InputWrap>

                      {form.confirmPassword && form.password !== form.confirmPassword && (
                        <Hint>Passwords do not match. Please re-check.</Hint>
                      )}
                    </Field>
                  )}

                  <Submit type="submit" disabled={!canSubmit}>
                    {isSignup ? "Create Account" : "Login"}
                  </Submit>

                  <SwitchText>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                    <SwitchLink onClick={() => setMode(isSignup ? "login" : "signup")}>
                      {isSignup ? "Login" : "Sign Up"}
                    </SwitchLink>
                  </SwitchText>
                </Form>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Hero>
    </Page>
  );
}
