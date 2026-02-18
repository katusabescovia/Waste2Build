import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";

const Bar = styled.header`
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.div`
  font-weight: 900;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Nav = styled.nav`
  display: flex;
  gap: 18px;
  align-items: center;

  a {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.radius.pill};
  }

  a.active {
    background: #eafff1;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const Account = styled(NavLink)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
`;

export default function Navbar() {
  return (
    <Bar>
      <Inner>
        <Brand>WASTE2BUILD</Brand>

        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <NavLink to="/seller/dashboard">For Sellers</NavLink>
          <NavLink to="/recycler/portal">For Recyclers</NavLink>
          <NavLink to="/learn">Learn</NavLink>

          <Account to="/auth">
            Account <FiChevronDown style={{ marginLeft: 6 }} />
          </Account>
        </Nav>
      </Inner>
    </Bar>
  );
}
