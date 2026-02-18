import { useMemo, useState } from "react";
import styled from "styled-components";
import { FiPlus, FiBox, FiTrendingUp, FiGift, FiCheckCircle, FiClock, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

/* --------------------------- Styles --------------------------- */

const Page = styled.div`
  padding: 0 0 60px;
`;

const Header = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  padding: 44px 0;
  color: white;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 0 18px;
`;

const HeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 36px;

  @media (max-width: 620px) {
    font-size: 30px;
  }
`;

const Sub = styled.p`
  margin: 10px 0 0;
  opacity: 0.92;
  max-width: 760px;
  line-height: 1.7;
`;

const NewBtn = styled(Link)`
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.12);
  color: white;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Body = styled.section`
  padding: 18px 0 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: -18px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 14px;
  display: grid;
  gap: 8px;
`;

const StatTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: grid;
  place-items: center;
  background: ${({ $tone }) => $tone};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 900;
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 900;
`;

const StatHint = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
  margin-top: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const CardHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const CardTitle = styled.div`
  font-weight: 900;
`;

const Tabs = styled.div`
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $active }) => ($active ? "#E9FBF1" : "#fff")};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 8px 12px;
  font-weight: 900;
  cursor: pointer;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const List = styled.div`
  display: grid;
  gap: 10px;
`;

const Row = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 12px;
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.8fr auto;
  gap: 10px;
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ItemTitle = styled.div`
  font-weight: 900;
`;

const ItemSub = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 900;
  font-size: 12px;
  width: fit-content;
  background: ${({ $type }) => {
    if ($type === "available") return "#E9FBF1";
    if ($type === "pending") return "#FFF7E6";
    return "#F1F5F9";
  }};
`;

const Small = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  @media (max-width: 980px) {
    justify-content: flex-start;
  }
`;

const ViewBtn = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const RightCol = styled.div`
  display: grid;
  gap: 14px;
`;

const ActionBtn = styled(Link)`
  width: 100%;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const GhostBtn = styled(Link)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Impact = styled.div`
  border: 1px solid #b7f7cc;
  background: #e9fbf1;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px;
  display: grid;
  gap: 10px;
`;

const ImpactTitle = styled.div`
  font-weight: 900;
`;

const ImpactValue = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
`;

const ImpactList = styled.div`
  display: grid;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};

  span {
    display: inline-flex;
    gap: 8px;
    align-items: center;
  }
`;

const Transactions = styled.div`
  display: grid;
  gap: 10px;
`;

const Tx = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const TxLeft = styled.div`
  display: grid;
  gap: 4px;
`;

const TxAmount = styled.div`
  font-weight: 900;
`;

const TxDate = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const TxRight = styled.div`
  display: grid;
  gap: 6px;
  text-align: right;

  @media (max-width: 520px) {
    text-align: left;
  }
`;

const Points = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  background: #e9fbf1;
  border: 1px solid #b7f7cc;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 6px 10px;
  width: fit-content;
  justify-self: end;

  @media (max-width: 520px) {
    justify-self: start;
  }
`;

const Empty = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.6;
`;

/* --------------------------- Mock Data --------------------------- */

const MOCK_LISTINGS = [
  { id: "1", title: "Clean PET Plastic Bottles", weightKg: 25, totalPrice: 3750, status: "available" },
  { id: "2", title: "HDPE Plastic Containers", weightKg: 40, totalPrice: 7200, status: "available" },
  { id: "3", title: "Mixed Plastic Bags", weightKg: 15, totalPrice: 1800, status: "pending" },
];

const MOCK_TX = [
  { id: "t1", amount: 5250, date: "2/8/2026", points: 525, status: "Completed" },
  { id: "t2", amount: 2400, date: "2/5/2026", points: 240, status: "Completed" },
  { id: "t3", amount: 3600, date: "2/1/2026", points: 360, status: "Completed" },
];

export default function SellerDashboard() {
  const [tab, setTab] = useState("active"); // active | pending | all

  const rows = useMemo(() => {
    if (tab === "active") return MOCK_LISTINGS.filter((x) => x.status === "available");
    if (tab === "pending") return MOCK_LISTINGS.filter((x) => x.status === "pending");
    return MOCK_LISTINGS;
  }, [tab]);

  const totals = useMemo(() => {
    const totalEarnings = MOCK_TX.reduce((s, x) => s + x.amount, 0);
    const totalListings = MOCK_LISTINGS.length;
    const totalWeight = MOCK_LISTINGS.reduce((s, x) => s + x.weightKg, 0);
    const couponValue = 3500;
    return { totalEarnings, totalListings, totalWeight, couponValue };
  }, []);

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Welcome back, User!</Title>
              <Sub>Here’s your selling activity overview.</Sub>
            </div>

            <NewBtn to="/seller/create-listing">
              <FiPlus /> New Listing
            </NewBtn>
          </HeadRow>
        </Container>
      </Header>

      <Body>
        <Container>
          <StatsGrid>
            <Stat>
              <StatTop>
                <div>
                  <StatLabel>Total Earnings</StatLabel>
                  <StatValue>₦{totals.totalEarnings.toLocaleString()}</StatValue>
                  <StatHint>+12% from last month</StatHint>
                </div>
                <StatIcon $tone="#E9FBF1">
                  <FiTrendingUp />
                </StatIcon>
              </StatTop>
            </Stat>

            <Stat>
              <StatTop>
                <div>
                  <StatLabel>Total Listings</StatLabel>
                  <StatValue>{totals.totalListings}</StatValue>
                  <StatHint>3 active</StatHint>
                </div>
                <StatIcon $tone="#EAF3FF">
                  <FiBox />
                </StatIcon>
              </StatTop>
            </Stat>

            <Stat>
              <StatTop>
                <div>
                  <StatLabel>Total Weight Sold</StatLabel>
                  <StatValue>{totals.totalWeight} kg</StatValue>
                  <StatHint>Recycled materials</StatHint>
                </div>
                <StatIcon $tone="#F2EDFF">
                  <FiBox />
                </StatIcon>
              </StatTop>
            </Stat>

            <Stat>
              <StatTop>
                <div>
                  <StatLabel>Coupon Value</StatLabel>
                  <StatValue>₦{totals.couponValue.toLocaleString()}</StatValue>
                  <StatHint>3 active coupons</StatHint>
                </div>
                <StatIcon $tone="#FFF7E6">
                  <FiGift />
                </StatIcon>
              </StatTop>
            </Stat>
          </StatsGrid>

          <Grid>
            <Card>
              <CardHead>
                <CardTitle>Your Listings</CardTitle>
              </CardHead>

              <Tabs>
                <Tab type="button" $active={tab === "active"} onClick={() => setTab("active")}>
                  Active (3)
                </Tab>
                <Tab type="button" $active={tab === "pending"} onClick={() => setTab("pending")}>
                  Pending (1)
                </Tab>
                <Tab type="button" $active={tab === "all"} onClick={() => setTab("all")}>
                  All (3)
                </Tab>
              </Tabs>

              <CardBody>
                {rows.length === 0 ? (
                  <Empty>No listings in this tab.</Empty>
                ) : (
                  <List>
                    {rows.map((x) => (
                      <Row key={x.id}>
                        <div>
                          <ItemTitle>{x.title}</ItemTitle>
                          <ItemSub>
                            {x.weightKg} kg • ₦{x.totalPrice.toLocaleString()}
                          </ItemSub>
                        </div>

                        <Badge $type={x.status}>
                          {x.status === "pending" ? <FiClock /> : <FiCheckCircle />} {x.status}
                        </Badge>

                        <Small>
                          <strong>Listing ID</strong>
                          <div>{x.id}</div>
                        </Small>

                        <Actions>
                          <ViewBtn to={`/listings/${x.id}`}>
                            <FiEye /> View
                          </ViewBtn>
                        </Actions>
                      </Row>
                    ))}
                  </List>
                )}
              </CardBody>
            </Card>

            <RightCol>
              <Card>
                <CardHead>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHead>

                <CardBody>
                  <ActionBtn to="/seller/create-listing">
                    <FiPlus /> Create New Listing
                  </ActionBtn>

                  <GhostBtn to="/seller/rewards">
                    <FiGift /> View Rewards
                  </GhostBtn>

                  <GhostBtn to="/marketplace">
                    <FiBox /> Browse Marketplace
                  </GhostBtn>
                </CardBody>
              </Card>

              <Impact>
                <ImpactTitle>Your Impact</ImpactTitle>
                <ImpactValue>135 kg</ImpactValue>
                <StatHint>Waste diverted from landfills</StatHint>

                <ImpactList>
                  <span>
                    <FiCheckCircle /> Saved 270 liters of water
                  </span>
                  <span>
                    <FiCheckCircle /> Reduced 95 kg CO₂ emissions
                  </span>
                  <span>
                    <FiCheckCircle /> Saved energy = 15 days electricity
                  </span>
                </ImpactList>
              </Impact>

              <Card>
                <CardHead>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHead>

                <CardBody>
                  <Transactions>
                    {MOCK_TX.map((t) => (
                      <Tx key={t.id}>
                        <TxLeft>
                          <TxAmount>₦{t.amount.toLocaleString()}</TxAmount>
                          <TxDate>{t.date}</TxDate>
                        </TxLeft>

                        <TxRight>
                          <Points>+{t.points} points</Points>
                          <Status>
                            <FiCheckCircle /> {t.status}
                          </Status>
                        </TxRight>
                      </Tx>
                    ))}
                  </Transactions>
                </CardBody>
              </Card>
            </RightCol>
          </Grid>
        </Container>
      </Body>
    </Page>
  );
}
