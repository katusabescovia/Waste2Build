import React from "react";
import styled from "styled-components";

// --- STYLED COMPONENTS ---

const Wrapper = styled.div`
  padding: 30px;
  background: #f8f9fb;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 8px;
  color: #1abc9c; /* Leading green color */
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #777;
  font-size: 15px;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 14px;
    color: #777;
    margin: 0 0 12px 0;
    font-weight: 500;
  }

  .value-container {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  h2 {
    font-size: 26px;
    margin: 0;
    color: #222;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

const Section = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  h3 {
    margin: 0 0 20px 0;
    font-size: 18px;
    color: #333;
  }

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 13px;
    color: #777;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
    font-weight: 600;
  }

  tr {
    transition: background 0.2s ease;
  }

  tbody tr:hover {
    background: #fdfdfd;
  }

  td {
    padding: 16px 8px 16px 0;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    color: #444;
  }

  /* Remove bottom border from last row */
  tbody tr:last-child td {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  background: ${(props) => (props.$status === "Completed" ? "rgba(0, 128, 0, 0.1)" : "rgba(255, 165, 0, 0.1)")};
  color: ${(props) => (props.$status === "Completed" ? "green" : "orange")};
`;

const SellerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f5f7fa;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

// --- COMPONENT ---

const AdminDashboard = () => {
  const sellers = [
    {
      id: 1,
      name: "John Doe",
      type: "Plastic Waste",
      amount: "$1,245",
      initial: "J",
      color: "#1abc9c",
    },
    {
      id: 2,
      name: "Sarah Lee",
      type: "Metal Scrap",
      amount: "$980",
      initial: "S",
      color: "#3498db",
    },
  ];

  const stats = [
    { id: 1, title: "Total Users", value: "2,543", percentage: "+8%" },
    { id: 2, title: "Total Listings", value: "1,234", percentage: "+5%" },
    { id: 3, title: "Total Transactions", value: "$45,231", percentage: "+12%" },
    { id: 4, title: "Total Waste", value: "12.5 tons", percentage: "+4%" },
  ];

  return (
    <Wrapper>
      <Header>
        <Title>Admin Dashboard</Title>
        <Subtitle>Monitor and manage system operations</Subtitle>
      </Header>

      {/* Top Stats Cards */}
      <Grid>
        {stats.map((stat) => (
          <Card key={stat.id}>
            <h4>{stat.title}</h4>
            <div className="value-container">
              <h2>{stat.value}</h2>
              <span style={{ color: "green", fontSize: "14px", fontWeight: "bold" }}>
                {stat.percentage}
              </span>
            </div>
          </Card>
        ))}
      </Grid>

      {/* Bottom Layout */}
      <BottomGrid>
        {/* Tables Section */}
        <Section>
          <h3>Recent Transactions</h3>
          <Table>
            <thead>
              <tr>
                <th>Seller</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Plastic Waste</td>
                <td>$120</td>
                <td><StatusBadge $status="Completed">Completed</StatusBadge></td>
                <td>2026-02-20</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Metal Scrap</td>
                <td>$250</td>
                <td><StatusBadge $status="Pending">Pending</StatusBadge></td>
                <td>2026-02-19</td>
              </tr>
            </tbody>
          </Table>
        </Section>

        {/* Top Sellers Section */}
        <Section>
          <h3>Top Sellers</h3>
          {sellers.map((seller) => (
            <SellerItem key={seller.id}>
              <SellerInfo>
                <Avatar style={{ background: seller.color }}>
                  {seller.initial}
                </Avatar>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                    {seller.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#777", marginTop: "2px" }}>
                    {seller.type}
                  </div>
                </div>
              </SellerInfo>
              <div style={{ color: "green", fontWeight: "bold" }}>
                {seller.amount}
              </div>
            </SellerItem>
          ))}
        </Section>
      </BottomGrid>
    </Wrapper>
  );
};

export default AdminDashboard;