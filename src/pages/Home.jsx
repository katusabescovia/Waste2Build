import styled from "styled-components";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const Hero = styled.section`
  background: linear-gradient(180deg, #eafff1 0%, #f7fafc 55%);
  padding: 34px 0 60px;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: center;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eafff1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 700;
`;

const H1 = styled.h1`
  margin: 14px 0 10px;
  font-size: 54px;
  line-height: 1.05;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const Sub = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
  line-height: 1.7;
  max-width: 520px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const SecondaryBtn = styled(Link)`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 800;
`;

const Stats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  flex-wrap: wrap;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ImageCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const Img = styled.div`
  height: 320px;
  background: #dbeafe;
`;

const Section = styled.section`
  padding: 60px 0;
`;

const SectionTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 30px;
`;

const SectionSub = styled.p`
  margin: 10px auto 0;
  max-width: 620px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
`;

const Cards = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 18px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const Mini = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #eafff1;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const CTA = styled.section`
  background: ${({ theme }) => theme.colors.teal};
  padding: 52px 0;
  color: white;
`;

export default function Home() {
  return (
    <>
      <Hero>
        <Container>
          <HeroGrid>
            <div>
              <Pill>🌿 Building a Sustainable Future</Pill>

              <H1>
                Turn Your Waste <br /> into <span>Cash</span>
              </H1>

              <Sub>
                Join Waste2Build and connect with recyclers who need materials. Earn money, get rewards, and help the planet.
              </Sub>

              <Actions>
                <PrimaryBtn to="/auth">
                  Get Started <FiArrowRight />
                </PrimaryBtn>
                <SecondaryBtn to="/marketplace">Browse Listings</SecondaryBtn>
              </Actions>

              <Stats>
                <div><strong>5,000+</strong> Happy Sellers</div>
                <div><strong>₦2.5M</strong> Earned So Far</div>
                <div><strong>50T+</strong> Waste Recycled</div>
              </Stats>
            </div>

            <ImageCard>
              <Img />
              {/* Later you will replace <Img/> with your actual image:
                  <img src={yourImage} alt="..." style={{ width:"100%", height:"320px", objectFit:"cover" }} />
              */}
            </ImageCard>
          </HeroGrid>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SectionTitle>How It Works</SectionTitle>
          <SectionSub>Start earning from your recyclable waste in three simple steps</SectionSub>

          <Cards>
            <Card>
              <Mini>1</Mini>
              <h3>Collect & Weigh</h3>
              <p style={{ color: "#64748B", lineHeight: 1.7 }}>
                Gather your recyclable waste materials, weigh them, and take clear photos.
              </p>
            </Card>

            <Card>
              <Mini>2</Mini>
              <h3>List & Price</h3>
              <p style={{ color: "#64748B", lineHeight: 1.7 }}>
                Create a listing with photos, weight, and set your fixed price.
              </p>
            </Card>

            <Card>
              <Mini>3</Mini>
              <h3>Sell & Earn</h3>
              <p style={{ color: "#64748B", lineHeight: 1.7 }}>
                Get paid when your waste is purchased and earn reward coupons too.
              </p>
            </Card>
          </Cards>
        </Container>
      </Section>

      <CTA>
        <Container>
          <h2 style={{ margin: 0, textAlign: "center" }}>Ready to Turn Your Waste into Wealth?</h2>
          <p style={{ margin: "10px 0 18px", textAlign: "center", opacity: 0.9 }}>
            Join thousands of sellers already earning money and helping the environment.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <PrimaryBtn to="/seller/create-listing">
              Create Your First Listing <FiArrowRight />
            </PrimaryBtn>
            <SecondaryBtn to="/marketplace">Explore Marketplace</SecondaryBtn>
          </div>

          <div style={{ marginTop: 20, display: "grid", placeItems: "center" }}>
            <div style={{ display: "flex", gap: 14, opacity: 0.95, flexWrap: "wrap", justifyContent: "center" }}>
              <span><FiCheckCircle /> 5,000+ Active Contributors</span>
              <span><FiCheckCircle /> 50 Tons Plastic Recycled</span>
              <span><FiCheckCircle /> 100,000 m² Land Pollution Avoided</span>
            </div>
          </div>
        </Container>
      </CTA>
    </>
  );
}
