import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { FiPlus, FiBox, FiTrendingUp, FiGift, FiCheckCircle, FiClock, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


// Backend base URL (change to production later)

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_ME = `${BASE_URL}/api/auth/me`; // endpoint to get logged-in user

/* --------------------------- Styles --------------------------- */
// Your existing styles remain 100% unchanged — no modifications here

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

/* --------------------------- Component --------------------------- */

export default function SellerDashboard() {
  const [userName, setUserName] = useState("Seller"); // fallback
  const [dashboardData, setDashboardData] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("active"); // active | pending | all

  const navigate = useNavigate();

  // Fetch logged-in user's name + dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your dashboard");
          setLoading(false);
          navigate("/auth");
          return;
        }

        // 1. Get current user (for real name in "Welcome back")
        const meRes = await axios.get(`${BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (meRes.data.success && meRes.data.user?.fullName) {
          setUserName(meRes.data.user.fullName);
        }

        // 2. Fetch seller dashboard stats (adjust endpoint if needed)
        const dashboardRes = await axios.get(`${BASE_URL}/api/materials/seller/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDashboardData(dashboardRes.data);

        // 3. Fetch seller's own listings
        const listingsRes = await axios.get(`${BASE_URL}/api/materials/my-listings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setListings(listingsRes.data.materials || []);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard");
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const rows = useMemo(() => {
    if (tab === "active") return listings.filter((x) => x.status === "available");
    if (tab === "pending") return listings.filter((x) => x.status === "accepted"); // adjust if needed
    return listings;
  }, [tab, listings]);

  const totals = useMemo(() => {
    if (!dashboardData) {
      return { totalEarnings: 0, totalListings: 0, totalWeight: 0, totalQuantityAdded: 0 };
    }

    return {
      totalEarnings: dashboardData.totalEarnings || 0,
      totalListings: dashboardData.totalProductsAdded || 0,
      totalWeight: dashboardData.totalQuantitySold || 0,
      totalQuantityAdded: dashboardData.totalQuantityAdded || 0,
    };
  }, [dashboardData]);

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading your dashboard...</div>;

  if (error) return <div style={{ textAlign: "center", padding: "50px", color: "#ef4444" }}>Error: {error}</div>;

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Welcome back, {userName}!</Title>
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
                  <StatLabel>Total Weight Added</StatLabel>
                  <StatValue>{totals.totalQuantityAdded.toLocaleString()}</StatValue>
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
                  Active ({rows.filter((x) => x.status === "available").length})
                </Tab>
                <Tab type="button" $active={tab === "pending"} onClick={() => setTab("pending")}>
                  Pending ({rows.filter((x) => x.status === "accepted").length})
                </Tab>
                <Tab type="button" $active={tab === "all"} onClick={() => setTab("all")}>
                  All ({listings.length})
                </Tab>
              </Tabs>

              <CardBody>
                {rows.length === 0 ? (
                  <Empty>No listings in this tab.</Empty>
                ) : (
                  <List>
                    {rows.map((x) => (
                      <Row key={x._id}>
                        <div>
                          <ItemTitle>{x.title}</ItemTitle>
                          <ItemSub>
                            {x.quantity} {x.unit} • ₦{x.totalPrice.toLocaleString()}
                          </ItemSub>
                        </div>

                        <Badge $type={x.status}>
                          {x.status === "pending" ? <FiClock /> : <FiCheckCircle />} {x.status}
                        </Badge>

                        <Small>
                          <strong>Listing ID</strong>
                          <div>{x._id}</div>
                        </Small>

                        <Actions>
                          <ViewBtn to={`/listings/${x._id}`}>
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
                    {/* Replace with real data from backend later */}
                    <Tx>
                      <TxLeft>
                        <TxAmount>₦5,250</TxAmount>
                        <TxDate>2/8/2026</TxDate>
                      </TxLeft>
                      <TxRight>
                        <Points>+525 points</Points>
                        <Status>
                          <FiCheckCircle /> Completed
                        </Status>
                      </TxRight>
                    </Tx>
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