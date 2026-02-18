import styled from "styled-components";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.navy};
  color: #cbd5e1;
  padding: 40px 0;
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h4`
  margin: 0 0 10px;
  color: white;
`;

const Link = styled.a`
  display: block;
  color: #cbd5e1;
  font-size: 13px;
  margin: 8px 0;
`;

const Social = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

const Bottom = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 26px auto 0;
  padding: 0 18px;
  font-size: 12px;
  opacity: 0.8;
  text-align: center;
`;

export default function Footer() {
  return (
    <Wrap>
      <Inner>
        <div>
          <Title>WASTE2BUILD</Title>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
            Connecting communities with recyclers to transform waste into valuable resources.
          </p>
          <Social>
            <FiFacebook />
            <FiTwitter />
            <FiInstagram />
          </Social>
        </div>

        <div>
          <Title>Quick Links</Title>
          <Link href="#">Browse Listings</Link>
          <Link href="#">Sell Your Waste</Link>
          <Link href="#">Dashboard</Link>
          <Link href="#">Rewards</Link>
        </div>

        <div>
          <Title>For Businesses</Title>
          <Link href="#">Recycler Portal</Link>
          <Link href="#">Bulk Orders</Link>
          <Link href="#">Partner With Us</Link>
          <Link href="#">Material Catalog</Link>
        </div>

        <div>
          <Title>Support</Title>
          <Link href="#">Help Center</Link>
          <Link href="#">Contact Us</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </Inner>

      <Bottom>© 2026 Waste to Build. All rights reserved. Building a sustainable future together.</Bottom>
    </Wrap>
  );
}
