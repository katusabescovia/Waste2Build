import styled from "styled-components";
import { FiAlertTriangle, FiCheckCircle, FiGlobe } from "react-icons/fi";


const Header = styled.section`
  background: ${({ theme }) => theme.colors.teal};
  padding: 52px 0;
  color: white;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const Center = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 800;
  opacity: 0.95;
`;

const Title = styled.h1`
  margin: 14px 0 10px;
  font-size: 40px;
  line-height: 1.15;

  @media (max-width: 650px) {
    font-size: 32px;
  }
`;

const Sub = styled.p`
  margin: 0;
  max-width: 760px;
  opacity: 0.92;
  line-height: 1.7;
`;

const Section = styled.section`
  padding: 38px 0;
`;

const SectionTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 26px;
`;

const SectionSub = styled.p`
  margin: 10px auto 0;
  max-width: 760px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
`;

const TwoCol = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ $tone }) => $tone || "#fff"};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const CardTitle = styled.div`
  font-weight: 900;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const List = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;
  font-size: 13px;
`;

const NumberBadge = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  align-items: start;
`;

const ItemIcon = styled.div`
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  opacity: 0.9;
`;

const ItemTitle = styled.strong`
  display: block;
`;

const ItemText = styled.small`
  display: block;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const SDGWrap = styled.div`
  margin-top: 18px;
  background: #eafff1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const SDGTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
`;

const SDGSub = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 6px;
`;

const SDGGoal = styled.div`
  margin-top: 10px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SDGTargets = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Target = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px;

  strong {
    display: block;
  }

  p {
    margin: 6px 0 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
  }
`;

const ImpactGrid = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ImpactBoxes = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const ImpactBox = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 12px;
`;

const ImpactBig = styled.div`
  font-size: 22px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
`;

const ImpactLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 4px;
`;

const ImpactLine = styled.div`
  font-size: 12px;
  margin-top: 8px;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SoftBlueCard = styled(Card)`
  border-color: #bbd7ff;
  background: #f3f8ff;
`;

const CTA = styled.section`
  background: ${({ theme }) => theme.colors.primaryDark};
  padding: 46px 0;
  color: white;
  margin-top: 24px;
`;

const CTAButtons = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTABtn = styled.a`
  background: ${({ $variant }) => ($variant === "outline" ? "transparent" : "#fff")};
  color: ${({ $variant, theme }) => ($variant === "outline" ? "white" : theme.colors.text)};
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
`;

const CTAMetrics = styled.div`
  display: grid;
  place-items: center;
  margin-top: 18px;
  opacity: 0.92;
`;

const MetricRow = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;

  strong {
    margin-right: 6px;
  }
`;

export default function Learn() {
  return (
    <>
      <Header>
        <Container>
          <Center>
            <Pill>📘 Learn &amp; Act</Pill>
            <Title>Understanding Plastic Pollution &amp; Land Degradation</Title>
            <Sub>
              Discover how recycling plastic waste helps protect our land and supports UN Sustainable Development Goal 15: Life on Land
            </Sub>
          </Center>
        </Container>
      </Header>

      <Section>
        <Container>
          <SectionTitle>The Problem: Plastic Pollution</SectionTitle>
          <SectionSub>
            Plastic waste is one of the most pressing environmental challenges affecting land ecosystems.
          </SectionSub>

          <TwoCol>
            <Card $tone="#FFECEC">
              <CardTitle>
                <FiAlertTriangle />
                Global Impact Statistics
              </CardTitle>

              <List>
                <Item>
                  <NumberBadge>1</NumberBadge>
                  <div>
                    <ItemTitle>400 Million Tons Annually</ItemTitle>
                    <ItemText>Global plastic production per year, with half used just once.</ItemText>
                  </div>
                </Item>

                <Item>
                  <NumberBadge>2</NumberBadge>
                  <div>
                    <ItemTitle>Only 9% Recycled</ItemTitle>
                    <ItemText>Of all plastic waste ever produced has been recycled.</ItemText>
                  </div>
                </Item>

                <Item>
                  <NumberBadge>3</NumberBadge>
                  <div>
                    <ItemTitle>1000+ Years to Decompose</ItemTitle>
                    <ItemText>Plastic persists in the environment, contaminating soil and water.</ItemText>
                  </div>
                </Item>

                <Item>
                  <NumberBadge>4</NumberBadge>
                  <div>
                    <ItemTitle>Microplastics Everywhere</ItemTitle>
                    <ItemText>Found in soil, affecting plant growth and food chains.</ItemText>
                  </div>
                </Item>
              </List>
            </Card>

            <Card $tone="#FFF6E9">
              <CardTitle>
                <FiAlertTriangle />
                Land Degradation Effects
              </CardTitle>

              <List>
                <Item>
                  <ItemIcon><FiAlertTriangle /></ItemIcon>
                  <div>
                    <ItemTitle>Habitat Destruction</ItemTitle>
                    <ItemText>Plastic waste covers land, destroying natural habitats for wildlife.</ItemText>
                  </div>
                </Item>

                <Item>
                  <ItemIcon><FiAlertTriangle /></ItemIcon>
                  <div>
                    <ItemTitle>Soil Contamination</ItemTitle>
                    <ItemText>Toxic chemicals leach into soil, reducing fertility and crop yields.</ItemText>
                  </div>
                </Item>

                <Item>
                  <ItemIcon><FiAlertTriangle /></ItemIcon>
                  <div>
                    <ItemTitle>Air Pollution</ItemTitle>
                    <ItemText>Burning plastic releases harmful toxins into the atmosphere.</ItemText>
                  </div>
                </Item>

                <Item>
                  <ItemIcon><FiAlertTriangle /></ItemIcon>
                  <div>
                    <ItemTitle>Climate Impact</ItemTitle>
                    <ItemText>Plastic production and disposal contribute to greenhouse gas emissions.</ItemText>
                  </div>
                </Item>
              </List>
            </Card>
          </TwoCol>

          <SDGWrap>
            <SDGTitle>
              <FiGlobe />

              UN SDG 15: Life on Land
            </SDGTitle>
            <SDGSub>Protecting terrestrial ecosystems through sustainable practices</SDGSub>

            <SDGGoal>
              <strong>Goal:</strong> Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests,
              combat desertification, halt and reverse land degradation, and halt biodiversity loss.
            </SDGGoal>

            <SDGTargets>
              <Target>
                <strong>Target 15.5</strong>
                <p>Reduce degradation of natural habitats and halt the loss of biodiversity.</p>
              </Target>

              <Target>
                <strong>Target 15.1</strong>
                <p>Ensure conservation and sustainable use of terrestrial ecosystems.</p>
              </Target>

              <Target>
                <strong>Target 15.3</strong>
                <p>Combat desertification and restore degraded land and soil.</p>
              </Target>
            </SDGTargets>
          </SDGWrap>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle>How Recycling Helps</SectionTitle>
          <SectionSub>
            Every kilogram of plastic recycled makes a tangible difference to our land ecosystems.
          </SectionSub>

          <ImpactGrid>
            <Card>
              <CardTitle>Environmental Benefits</CardTitle>

              <List>
                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>
                    <ItemTitle>Reduces Landfill Waste</ItemTitle>
                    <ItemText>Less plastic in landfills means more land available for natural ecosystems.</ItemText>
                  </div>
                </Item>

                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>
                    <ItemTitle>Protects Biodiversity</ItemTitle>
                    <ItemText>Cleaner land supports diverse plant and animal species.</ItemText>
                  </div>
                </Item>

                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>
                    <ItemTitle>Prevents Soil Contamination</ItemTitle>
                    <ItemText>Recycling stops toxic chemicals from leaching into soil.</ItemText>
                  </div>
                </Item>

                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>
                    <ItemTitle>Conserves Resources</ItemTitle>
                    <ItemText>Less need for virgin plastic reduces environmental extraction.</ItemText>
                  </div>
                </Item>
              </List>
            </Card>

            <SoftBlueCard>
              <CardTitle>Your Impact Through Waste2Build</CardTitle>

              <ImpactBoxes>
                <ImpactBox>
                  <ImpactBig>1 kg</ImpactBig>
                  <ImpactLabel>Plastic recycled</ImpactLabel>
                  <ImpactLine>
                    <strong>2 m²</strong> land pollution avoided
                  </ImpactLine>
                </ImpactBox>

                <ImpactBox>
                  <ImpactBig>10 kg</ImpactBig>
                  <ImpactLabel>Plastic recycled</ImpactLabel>
                  <ImpactLine>
                    <strong>1.8 kg</strong> CO₂ emissions prevented
                  </ImpactLine>
                </ImpactBox>
              </ImpactBoxes>

              <List>
                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>Connect waste generators with recyclers directly</div>
                </Item>
                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>Ensure plastic gets recycled instead of dumped</div>
                </Item>
                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>Track your environmental impact in real-time</div>
                </Item>
                <Item>
                  <ItemIcon><FiCheckCircle /></ItemIcon>
                  <div>Earn money while helping the planet</div>
                </Item>
              </List>
            </SoftBlueCard>
          </ImpactGrid>
        </Container>
      </Section>

      <CTA>
        <Container>
          <Center>
            <h2>Ready to Make a Difference?</h2>
            <Sub>
              Join thousands of people using Waste2Build to transform plastic waste into wealth while protecting our land ecosystems.
            </Sub>

            <CTAButtons>
              <CTABtn href="/seller/create-listing">Start Selling Waste</CTABtn>
              <CTABtn $variant="outline" href="/marketplace">Browse Marketplace</CTABtn>
            </CTAButtons>

            <CTAMetrics>
              <MetricRow>
                <span><strong>5,000+</strong> Active Contributors</span>
                <span><strong>50 Tons</strong> Plastic Recycled</span>
                <span><strong>100,000 m²</strong> Land Pollution Avoided</span>
              </MetricRow>
            </CTAMetrics>
          </Center>
        </Container>
      </CTA>
    </>
  );
}
