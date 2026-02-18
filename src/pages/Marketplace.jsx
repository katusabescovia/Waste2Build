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
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 900;
`;

const listingsData = [
  {
    id: "1",
    title: "Clean PET Plastic Bottles",
    desc: "Sorted and cleaned plastic bottles from household collection. Ready for recycling.",
    weightKg: 25,
    location: "Lagos, Nigeria",
    seller: "Sarah Johnson",
    totalPrice: 3750,
    perKg: 150,
    status: "available",
    tag: "pet plastic",
    tagTone: "#EAF3FF",
  },
  {
    id: "2",
    title: "HDPE Plastic Containers",
    desc: "High-density polyethylene containers from small business. Clean and sorted.",
    weightKg: 40,
    location: "Abuja, Nigeria",
    seller: "Green Collectors Co.",
    totalPrice: 7200,
    perKg: 180,
    status: "available",
    tag: "hdpe plastic",
    tagTone: "#EAF3FF",
  },
  {
    id: "3",
    title: "Mixed Plastic Bags",
    desc: "Collected plastic bags from neighborhood. Sorted and bundled.",
    weightKg: 15,
    location: "Port Harcourt, Nigeria",
    seller: "Student Eco Initiative",
    totalPrice: 1800,
    perKg: 120,
    status: "available",
    tag: "plastic bags",
    tagTone: "#F2EDFF",
  },
  {
    id: "4",
    title: "PP Plastic Scraps",
    desc: "Polypropylene plastic scraps from manufacturing. High quality material.",
    weightKg: 60,
    location: "Kano, Nigeria",
    seller: "Industrial Waste Solutions",
    totalPrice: 12000,
    perKg: 200,
    status: "pending",
    tag: "pp plastic",
    tagTone: "#F2EDFF",
  },
  {
    id: "5",
    title: "Metal Cans Aluminum",
    desc: "Sorted aluminum cans from beverage collection. Clean and compressed.",
    weightKg: 30,
    location: "Ibadan, Nigeria",
    seller: "Community Recyclers",
    totalPrice: 7500,
    perKg: 250,
    status: "available",
    tag: "metal cans",
    tagTone: "#F1F5F9",
  },
  {
    id: "6",
    title: "Cardboard and Paper",
    desc: "Clean cardboard boxes and paper from office collection.",
    weightKg: 50,
    location: "Lagos, Nigeria",
    seller: "Sarah Johnson",
    totalPrice: 4000,
    perKg: 80,
    status: "available",
    tag: "paper cardboard",
    tagTone: "#FFF1E6",
  },
];

export default function Marketplace() {
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
            <strong>6</strong>
            <span>Total Listings</span>
          </Stat>
          <Stat>
            <strong style={{ color: "#0A9B47" }}>5</strong>
            <span>Available Now</span>
          </Stat>
          <Stat>
            <strong>220 kg</strong>
            <span>Total Weight</span>
          </Stat>
          <Stat>
            <strong>₦163</strong>
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
                <select defaultValue="all">
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                </select>
              </InputWrap>
            </FilterRow>

            <ResultsText>Showing 6 results</ResultsText>
          </FilterCard>

          <Grid>
            {listingsData.map((item) => (
              <Card key={item.id}>
                <Img />
                <CardBody>
                  <Row>
                    <Name>{item.title}</Name>
                    <Badge $type={item.status}>{item.status === "available" ? "Available" : "Pending"}</Badge>
                  </Row>

                  <Row style={{ marginTop: 8 }}>
                    <div />
                    <Tag $tone={item.tagTone}>{item.tag}</Tag>
                  </Row>

                  <Desc>{item.desc}</Desc>

                  <Meta>
                    <span><FiBox /> {item.weightKg} kg</span>
                    <span><FiMapPin /> {item.location}</span>
                    <span><FiUser /> {item.seller}</span>
                    <span />
                  </Meta>

                  <PriceRow>
                    <Price>
                      <strong>₦{item.totalPrice.toLocaleString()}</strong>
                      <div>Total Price</div>
                    </Price>
                    <PerKg>
                      <div>Per kg</div>
                      <strong>₦{item.perKg}</strong>
                    </PerKg>
                  </PriceRow>

                  <Button to={`/listings/${item.id}`}>View Details</Button>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Body>
    </Page>
  );
}
