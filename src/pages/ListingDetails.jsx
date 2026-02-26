import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";

/* --------------------------- Layout (your original styles – 100% unchanged) --------------------------- */

const Page = styled.div`
  padding: 0 0 60px;
  position: relative;
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
  max-width: 760px;
  line-height: 1.7;
`;

const Back = styled(Link)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Body = styled.section`
  padding: 22px 0 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 14px;

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
    return "#F1F5F9";
  }};
`;

const CardBody = styled.div`
  padding: 16px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Img = styled.div`
  height: 120px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #e2e8f0;
  background-size: cover;
  background-position: center;
`;

const MetaGrid = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Meta = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 12px;
  display: grid;
  gap: 6px;
`;

const MetaTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  font-weight: 900;
`;

const MetaValue = styled.div`
  font-weight: 900;
  font-size: 14px;
`;

const Desc = styled.p`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
  font-size: 13px;
`;

const Summary = styled.div`
  display: grid;
  gap: 10px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Total = styled.div`
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 22px;
  }
`;

const Actions = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 10px;
`;

const PrimaryBtn = styled.button`
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Note = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

// Toast notification (minimal, non-intrusive – appears at top-right)
const Toast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  color: white;
  font-weight: 900;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: fadeInOut 4s forwards;
  background: ${({ $type }) => ($type === "success" ? "#28a745" : "#dc3545")};

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  }
`;

// Confirmation Modal (your exact modal styles – no change)
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 50;
`;

const Modal = styled.div`
  width: min(560px, 100%);
  background: white;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const ModalHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-weight: 900;
`;

const CloseBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 16px;
  display: grid;
  gap: 12px;
`;

const ModalText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.7;
`;

const ModalFooter = styled.div`
  padding: 14px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`;

const OutlineBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  cursor: pointer;
`;

const ConfirmBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

/* --------------------------- Component --------------------------- */

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  // Show toast for 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch listing + role
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const materialRes = await fetch(`http://localhost:5000/api/materials/${id}`);
        if (!materialRes.ok) throw new Error("Listing not found");
        const materialJson = await materialRes.json();
        if (!materialJson.success) throw new Error(materialJson.message || "Failed to load");

        const material = materialJson.material;
        if (material.photo && !material.photo.startsWith('http')) {
          material.photo = `http://localhost:5000${material.photo}`;
        }

        setListing(material);

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
        setError(err.message || "Failed to load listing");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const total = listing ? listing.quantity * listing.pricePerUnit : 0;

  const canAccept = listing?.status === "available" && userRole === "recycler";
  const canCancel = listing?.status === "accepted" && listing?.acceptedBy?._id === (JSON.parse(localStorage.getItem("user") || "{}")?._id);

  const statusIcon = () => {
    if (listing?.status === "available") return <FiCheckCircle />;
    if (listing?.status === "accepted") return <FiCheckCircle />;
    return <FiClock />;
  };

  const statusText = () => {
    if (listing?.status === "available") return "Available";
    if (listing?.status === "accepted") return "Accepted";
    return listing?.status || "Unknown";
  };

  const handleAcceptClick = () => {
    setConfirmOpen(true);
  };

  const confirmAccept = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/materials/${id}/accept`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to accept listing");
      }

      setConfirmOpen(false);
      setToast({ message: "Successfully accepted! Redirecting to pickup confirmation...", type: "success" });

      const pickupId = json.material?._id || id;
      setTimeout(() => navigate(`/pickup/${pickupId}`), 1500); // slight delay for toast visibility

      setListing((prev) => ({ ...prev, status: "accepted" }));
    } catch (err) {
      setToast({ message: err.message || "Failed to accept listing", type: "error" });
    }
  };

  const handleCancelAccept = async () => {
    if (!window.confirm("Are you sure you want to cancel your acceptance?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/materials/${id}/cancel-accept`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to cancel acceptance");
      }

      setToast({ message: "Successfully cancelled acceptance! Redirecting to portal...", type: "success" });
      setTimeout(() => navigate("/recycler/portal"), 1500);

      setListing((prev) => ({ ...prev, status: "available", acceptedBy: null }));
    } catch (err) {
      setToast({ message: err.message || "Failed to cancel acceptance", type: "error" });
    }
  };

  if (loading) return <div>Loading listing details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Listing Details</Title>
              <Sub>Review the listing information and accept to schedule a pickup with the seller.</Sub>
            </div>
            <Back to={userRole === "recycler" ? "/recycler/portal" : "/seller/dashboard"}>
              <FiArrowLeft /> Back to Portal
            </Back>
          </HeadRow>
        </Container>
      </Header>

      <Body>
        <Container>
          <Grid>
            <Card>
              <CardHead>
                <CardTitle>{listing.title}</CardTitle>
                <Badge $type={listing.status}>
                  {statusIcon()} {statusText()}
                </Badge>
              </CardHead>

              <CardBody>
                <ImageGrid>
                  {listing.photo ? (
                    <Img style={{ backgroundImage: `url(${listing.photo})` }} />
                  ) : (
                    <>
                      <Img />
                      <Img />
                      <Img />
                    </>
                  )}
                </ImageGrid>

                <MetaGrid>
                  <Meta>
                    <MetaTop>
                      <FiUser /> Seller
                    </MetaTop>
                    <MetaValue>{listing.seller?.fullName || "Unknown Seller"}</MetaValue>
                  </Meta>

                  <Meta>
                    <MetaTop>
                      <FiMapPin /> Location
                    </MetaTop>
                    <MetaValue>{listing.location}</MetaValue>
                  </Meta>

                  <Meta>
                    <MetaTop>
                      <FiBox /> Weight
                    </MetaTop>
                    <MetaValue>{listing.quantity} {listing.unit}</MetaValue>
                  </Meta>

                  <Meta>
                    <MetaTop>
                      <FiBox /> Category
                    </MetaTop>
                    <MetaValue>{listing.category}</MetaValue>
                  </Meta>
                </MetaGrid>

                <Desc>{listing.description}</Desc>
              </CardBody>
            </Card>

            <Card>
              <CardHead>
                <CardTitle>Pricing & Actions</CardTitle>
              </CardHead>

              <CardBody>
                <Summary>
                  <SummaryRow>
                    <span>Price per {listing.unit}</span>
                    <strong>₦{Number(listing.pricePerUnit).toLocaleString()}</strong>
                  </SummaryRow>

                  <SummaryRow>
                    <span>Total weight</span>
                    <strong>{listing.quantity} {listing.unit}</strong>
                  </SummaryRow>

                  <Total>
                    <span>Total price</span>
                    <strong>₦{total.toLocaleString()}</strong>
                  </Total>
                </Summary>

                <Actions>
                  {canAccept && (
                    <PrimaryBtn type="button" onClick={handleAcceptClick}>
                      <FiCheckCircle /> Accept Listing
                    </PrimaryBtn>
                  )}

                  {canCancel && (
                    <SecondaryBtn as="button" onClick={handleCancelAccept}>
                      Cancel Acceptance
                    </SecondaryBtn>
                  )}

                  <SecondaryBtn to="/marketplace">
                    <FiBox /> Back to Marketplace
                  </SecondaryBtn>

                  <Note>
                    If a listing is pending or accepted, it means another recycler is processing it.
                  </Note>
                </Actions>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Body>

      {/* Confirmation popup for Accept */}
      {confirmOpen && (
        <Overlay role="dialog" aria-modal="true">
          <Modal>
            <ModalHead>
              <ModalTitle>Confirm Acceptance</ModalTitle>
              <CloseBtn type="button" onClick={() => setConfirmOpen(false)} aria-label="Close">
                <FiX />
              </CloseBtn>
            </ModalHead>

            <ModalBody>
              <ModalText>
                Are you sure you want to accept this particular listing?
                <br />
                <strong>{listing.title}</strong>
              </ModalText>
            </ModalBody>

            <ModalFooter>
              <OutlineBtn type="button" onClick={() => setConfirmOpen(false)}>
                Cancel
              </OutlineBtn>
              <ConfirmBtn type="button" onClick={confirmAccept}>
                Yes, Accept
              </ConfirmBtn>
            </ModalFooter>
          </Modal>
        </Overlay>
      )}

      {/* Toast notification (top-right, auto-dismiss) */}
      {toast && (
        <Toast $type={toast.type}>
          {toast.message}
        </Toast>
      )}
    </Page>
  );
}