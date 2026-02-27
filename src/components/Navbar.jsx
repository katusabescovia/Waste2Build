import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";

/* =========================
   STYLED COMPONENTS (unchanged)
========================= */

const Bar = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`;

const BrandLogo = styled.img`
  width: 34px;
  height: 34px;
`;

const BrandText = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: #16a34a;
  letter-spacing: 0.5px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  font-size: 14px;
  color: #555;
  padding: 8px 12px;
  border-radius: 20px;
  text-decoration: none;

  &.active {
    background: #eafff1;
    color: #16a34a;
    font-weight: 700;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

const Account = styled(NavLink)`
  border: 1px solid #ddd;
  padding: 8px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 14px;

  &:hover {
    background: #f9f9f9;
  }
`;

/* =========================
   COMPONENT (only logic changed)
========================= */

export default function Navbar() {
  // Get role from localStorage (where your login usually saves token + user info)
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || null; // 'seller', 'recycler', or null

  return (
    <Bar>
      <Inner>
        <BrandLink to="/">
          <BrandLogo src="/favicon.svg" alt="Waste2Build Logo" />
          <BrandText>WASTE2BUILD</BrandText>
        </BrandLink>

        <Nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/marketplace">Marketplace</StyledLink>

          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/learn">Learn</StyledLink>


          

          <Account to="/auth">
            Account <FiChevronDown style={{ marginLeft: 6 }} />
          </Account>
        </Nav>
      </Inner>
    </Bar>
  );
}