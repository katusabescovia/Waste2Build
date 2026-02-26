import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch, FiMapPin, FiBox, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const Page = styled.div``;

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

const Title = styled.h1`
  margin: 0;
  font-size: 40px;
  line-height: 1.1;
`;

const Sub = styled.p`
  margin: 10px 0 0;
  opacity: 0.92;
`;

const StatsRow = styled.div`
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatsInner = styled.div`
  max-width: ${({ theme }) => theme.container};
  margin: 0 auto;
  padding: 16px 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled.div`
  display: grid;
  gap: 4px;
  text-align: center;

  strong {
    font-size: 18px;
  }
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Body = styled.section`
  padding: 26px 0 60px;
`;

const FilterCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 16px;
`;

const FilterTitle = styled.div`
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterRow = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 12px;

  input, select {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
  }
`;

const ResultsText = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Grid = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

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

const Img = styled.div`
  height: 185px;
  background: #e2e8f0;
  background-size: cover;
  background-position: center;
`;

const CardBody = styled.div`
  padding: 14px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const Desc = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.5;
`;

const Meta = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const PriceRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Price = styled.div`
  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
  }
  div {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 2px;
  }
`;

const PerKg = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  text-align: right;
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 800;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $type }) => {
    if ($type === "available") return "#E9FBF1";
    if ($type === "pending") return "#FFF7E6";
    return "#F1F5F9";
  }};
  color: ${({ theme }) => theme.colors.text};
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $tone }) => $tone || "#F1F5F9"};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 800;
`;

const Button = styled(Link)`
  margin-top: 12px;
  display: block;
  text-align: center;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $disabled }) => $disabled ? '#d1d5db' : theme.colors.primary};
  color: white;
  font-weight: 900;
  pointer-events: ${({ $disabled }) => $disabled ? 'none' : 'auto'};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
`;

const DisabledText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`;

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [userRole, setUserRole] = useState(null); // null = not logged in, "seller", "recycler"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch public available listings
        const res = await fetch("http://localhost:5000/api/materials");
        if (!res.ok) throw new Error("Failed to load marketplace");
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Error");

        // Filter only available
        const available = json.materials.filter(m => m.status === "available");
        setListings(available);

        // 2. Check logged-in user role (optional – no token = guest)
        const token = localStorage.getItem("token");
        if (token) {
          const userRes = await fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (userRes.ok) {
            const userJson = await userRes.json();
            setUserRole(userJson.user?.role || null);
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "Could not load available materials");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isLoggedInAsAllowed = userRole === "seller" || userRole === "recycler";

  if (loading) return <div style={{ textAlign: 'center', padding: '80px 20px' }}>Loading marketplace...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '80px 20px' }}>Error: {error}</div>;

  return (
    <Page>
      <Header>
        <Container>
          <Title>Marketplace</Title>
          <Sub>Browse available recyclable materials from sellers across Nigeria</Sub>
        </Container>
      </Header>

      <StatsRow>
        <StatsInner>
          <Stat>
            <strong>{listings.length}</strong>
            <span>Total Listings</span>
          </Stat>
          <Stat>
            <strong style={{ color: "#0A9B47" }}>{listings.length}</strong>
            <span>Available Now</span>
          </Stat>
          <Stat>
            <strong>
              {listings.reduce((sum, item) => sum + item.quantity, 0)} kg
            </strong>
            <span>Total Weight</span>
          </Stat>
          <Stat>
            <strong>
              ₦{listings.length > 0 
                ? (listings.reduce((sum, item) => sum + item.pricePerUnit, 0) / listings.length).toFixed(0)
                : 0}
            </strong>
            <span>Avg. Price/kg</span>
          </Stat>
        </StatsInner>
      </StatsRow>

      <Body>
        <Container>
          <FilterCard>
            <FilterTitle>Filter Listings</FilterTitle>

            <FilterRow>
              <InputWrap>
                <FiSearch />
                <input placeholder="Search | PET Bottles" />
              </InputWrap>

              <InputWrap>
                <select defaultValue="all">
                  <option value="all">All Categories</option>
                  <option value="plastic">Plastic</option>
                  <option value="metal">Metal</option>
                  <option value="paper">Paper</option>
                </select>
              </InputWrap>

              <InputWrap>
                <select defaultValue="available">
                  <option value="available">Available</option>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                </select>
              </InputWrap>
            </FilterRow>

            <ResultsText>Showing {listings.length} available results</ResultsText>
          </FilterCard>

          <Grid>
            {listings.map((item) => (
              <Card key={item._id}>
                <Img 
                  style={item.photo ? { backgroundImage: `url(${item.photo.startsWith('http') ? item.photo : 'http://localhost:5000' + item.photo})` } : {}} 
                />
                <CardBody>
                  <Row>
                    <Name>{item.title}</Name>
                    <Badge $type={item.status}>
                      {item.status === "available" ? "Available" : item.status}
                    </Badge>
                  </Row>

                  {item.category && (
                    <Row style={{ marginTop: 8 }}>
                      <div />
                      <Tag $tone="#EAF3FF">{item.category}</Tag>
                    </Row>
                  )}

                  <Desc>{item.description || "No description provided"}</Desc>

                  <Meta>
                    <span><FiBox /> {item.quantity} {item.unit}</span>
                    <span><FiMapPin /> {item.location}</span>
                    <span><FiUser /> {item.seller?.fullName || "Seller"}</span>
                    <span />
                  </Meta>

                  <PriceRow>
                    <Price>
                      <strong>₦{(item.pricePerUnit * item.quantity).toLocaleString()}</strong>
                      <div>Total Price</div>
                    </Price>
                    <PerKg>
                      <div>Per {item.unit}</div>
                      <strong>₦{Number(item.pricePerUnit).toLocaleString()}</strong>
                    </PerKg>
                  </PriceRow>

                  {/* View Details button - disabled for non-logged-in / wrong role */}
                  <Button 
                    to={isLoggedInAsAllowed ? `/listings/${item._id}` : "#"}
                    $disabled={!isLoggedInAsAllowed}
                    onClick={(e) => {
                      if (!isLoggedInAsAllowed) {
                        e.preventDefault();
                        alert("Please log in as a seller or recycler to view details");
                      }
                    }}
                  >
                    View Details
                  </Button>

                  {!isLoggedInAsAllowed && (
                    <DisabledText>Please log in as seller or recycler to view details</DisabledText>
                  )}
                </CardBody>
              </Card>
            ))}
          </Grid>

          {listings.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
              No available materials found at the moment.<br />
              Check back later or log in to see more.
            </div>
          )}
        </Container>
      </Body>
    </Page>
  );
}