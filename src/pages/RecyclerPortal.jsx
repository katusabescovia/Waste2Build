import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { FiBox, FiCheckCircle, FiClock, FiLayers, FiEye, FiCheck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";



const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Page = styled.div`
  padding: 0 0 60px;
`;

const Header = styled.section`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.teal}, ${({ theme }) => theme.colors.primary});
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
  gap: 14px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
`;

const Sub = styled.p`
  margin: 10px 0 0;
  opacity: 0.92;
  max-width: 720px;
  line-height: 1.7;
`;

const Body = styled.section`
  padding: 22px 0 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
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
  align-items: center;
  justify-content: space-between;
`;

const StatIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: grid;
  place-items: center;
  background: ${({ $tone }) => $tone};
  color: ${({ theme }) => theme.colors.text};
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

const Panel = styled.div`
  margin-top: 16px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const PanelHead = styled.div`
  padding: 14px 16px;
`;

const PanelTitle = styled.div`
  font-weight: 900;
`;

const PanelSub = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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

const PanelBody = styled.div`
  padding: 16px;
`;

const Table = styled.div`
  display: grid;
  gap: 10px;
`;

const Row = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 12px;
  display: grid;
  grid-template-columns: 1.35fr 0.6fr 0.75fr 0.75fr 0.7fr;
  gap: 10px;
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const TitleCol = styled.div`
  display: grid;
  gap: 4px;
`;

const ItemTitle = styled.div`
  font-weight: 900;
`;

const ItemSub = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.4;
`;

const Small = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
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
    if ($type === "accepted") return "#EAF3FF";
    if ($type === "pickup_confirmed") return "#DCFCE7"; // light green for confirmed
    return "#F1F5F9";
  }};
  color: ${({ $type }) => {
    if ($type === "pickup_confirmed") return "#166534";
    return "inherit";
  }};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  @media (max-width: 980px) {
    justify-content: flex-start;
  }
`;

const Btn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LinkBtn = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Empty = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.6;
`;

export default function RecyclerPortal() {
  const [tab, setTab] = useState("all"); // all | available | pending | accepted
  const [listings, setListings] = useState([]); // all materials from DB
  const [myAccepted, setMyAccepted] = useState([]); // my accepted from DB
  const [dashboardStats, setDashboardStats] = useState(null);
  const [userName, setUserName] = useState("Recycler");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in as a recycler");
          setLoading(false);
          return;
        }

        // 1. Recycler dashboard stats
        const statsRes = await fetch(`${BASE_URL}/api/materials/recycler/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!statsRes.ok) throw new Error("Failed to load dashboard stats");
        const statsJson = await statsRes.json();
        setDashboardStats(statsJson);

        // 2. All materials (public)
        const allRes = await fetch(`${BASE_URL}/api/materials`);
        if (!allRes.ok) throw new Error("Failed to load materials");
        const allJson = await allRes.json();
        setListings(allJson.materials || []);

        // 3. My accepted listings (includes pickup_confirmed)
        const acceptedRes = await fetch(`${BASE_URL}/api/materials/my-accepted`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!acceptedRes.ok) throw new Error("Failed to load accepted listings");
        const acceptedJson = await acceptedRes.json();
        setMyAccepted(acceptedJson.materials || []);

        // 4. User name
        const userRes = await fetch(`${BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userRes.ok) {
          const userJson = await userRes.json();
          setUserName(userJson.user?.fullName || "Recycler");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const rows = useMemo(() => {
    if (tab === "all") return listings;
    if (tab === "available") return listings.filter((x) => x.status === "available");
    if (tab === "pending") return myAccepted.filter((x) => x.status === "accepted");
    if (tab === "accepted") {
      // Show both "accepted" (pending pickup) and "pickup_confirmed" (completed)
      return myAccepted.filter((x) => x.status === "accepted" || x.status === "pickup_confirmed");
    }
    return [];
  }, [tab, listings, myAccepted]);

  const stats = useMemo(() => {
    if (!dashboardStats) return { base: 0, available: 0, pending: 0, accepted: 0 };

    return {
      base: listings.length,
      available: dashboardStats.availableProducts || 0,
      pending: myAccepted.filter((x) => x.status === "accepted").length,
      accepted: myAccepted.filter((x) => x.status === "accepted" || x.status === "pickup_confirmed").length,
    };
  }, [dashboardStats, listings, myAccepted]);

  const acceptListing = (id) => {
    navigate(`/listings/${id}`);
  };

  const statusIcon = (status) => {
    if (status === "available") return <FiCheckCircle />;
    if (status === "pending") return <FiClock />;
    if (status === "accepted") return <FiCheck />;
    if (status === "pickup_confirmed") return <FiCheckCircle />; // confirmed icon
    return <FiLayers />;
  };

  const statusText = (status) => {
    if (status === "available") return "Available";
    if (status === "pending") return "Pending";
    if (status === "accepted") return "Accepted";
    if (status === "pickup_confirmed") return "Pickup Confirmed";
    return "All";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Welcome back, {userName}!</Title>
              <Sub>Browse listings, accept materials, and manage pickups from sellers across Nigeria.</Sub>
            </div>
          </HeadRow>
        </Container>
      </Header>

      <Body>
        <Container>
          <StatsGrid>
            <StatCard>
              <StatTop>
                <div>
                  <StatLabel>Total Listings</StatLabel>
                  <StatValue>{stats.base}</StatValue>
                </div>
                <StatIcon $tone="#EAF3FF">
                  <FiLayers />
                </StatIcon>
              </StatTop>
            </StatCard>

            <StatCard>
              <StatTop>
                <div>
                  <StatLabel>Available</StatLabel>
                  <StatValue>{stats.available}</StatValue>
                </div>
                <StatIcon $tone="#E9FBF1">
                  <FiCheckCircle />
                </StatIcon>
              </StatTop>
            </StatCard>

            <StatCard>
              <StatTop>
                <div>
                  <StatLabel>Pending</StatLabel>
                  <StatValue>{stats.pending}</StatValue>
                </div>
                <StatIcon $tone="#FFF7E6">
                  <FiClock />
                </StatIcon>
              </StatTop>
            </StatCard>

            <StatCard>
              <StatTop>
                <div>
                  <StatLabel>Accepted</StatLabel>
                  <StatValue>{stats.accepted}</StatValue>
                </div>
                <StatIcon $tone="#F2EDFF">
                  <FiBox />
                </StatIcon>
              </StatTop>
            </StatCard>
          </StatsGrid>

          <Panel>
            <PanelHead>
              <PanelTitle>Available Materials</PanelTitle>
              <PanelSub>Switch tabs to focus on available, pending, or accepted items.</PanelSub>
            </PanelHead>

            <Tabs>
              <Tab $active={tab === "all"} onClick={() => setTab("all")}>
                All
              </Tab>
              <Tab $active={tab === "available"} onClick={() => setTab("available")}>
                Available
              </Tab>
              <Tab $active={tab === "pending"} onClick={() => setTab("pending")}>
                Pending
              </Tab>
              <Tab $active={tab === "accepted"} onClick={() => setTab("accepted")}>
                Accepted
              </Tab>
            </Tabs>

            <PanelBody>
              {rows.length === 0 ? (
                <Empty>No items found in this tab.</Empty>
              ) : (
                <Table>
                  {rows.map((x) => {
                    const total = x.quantity * x.pricePerUnit;
                    const isConfirmed = x.status === "pickup_confirmed";
                    const isAccepted = x.status === "accepted" || isConfirmed;

                    return (
                      <Row key={x._id}>
                        <TitleCol>
                          <ItemTitle>{x.title}</ItemTitle>
                          <ItemSub>{x.location}</ItemSub>
                        </TitleCol>

                        <Small>
                          <strong>{x.quantity} {x.unit}</strong>
                          <div>Weight</div>
                        </Small>

                        <Small>
                          <strong>₦{x.pricePerUnit?.toLocaleString() || "N/A"}</strong>
                          <div>Per {x.unit}</div>
                        </Small>

                        <Small>
                          <strong>₦{total.toLocaleString()}</strong>
                          <div>Total</div>
                        </Small>

                        <Actions>
                          <LinkBtn to={`/listings/${x._id}`}>
                            <FiEye /> View
                          </LinkBtn>

                          <Btn
                            type="button"
                            onClick={() => acceptListing(x._id)}
                            disabled={isAccepted}
                          >
                            {isConfirmed ? (
                              <>
                                <FiCheckCircle /> Confirmed
                              </>
                            ) : isAccepted ? (
                              <>
                                <FiCheck /> Accepted
                              </>
                            ) : x.status === "pending" ? (
                              <>
                                <FiClock /> Pending
                              </>
                            ) : (
                              <>
                                <FiCheckCircle /> Accept
                              </>
                            )}
                          </Btn>
                        </Actions>

                        <Badge $type={x.status}>
                          {statusIcon(x.status)} {statusText(x.status)}
                        </Badge>
                      </Row>
                    );
                  })}
                </Table>
              )}
            </PanelBody>
          </Panel>
        </Container>
      </Body>
    </Page>
  );
}