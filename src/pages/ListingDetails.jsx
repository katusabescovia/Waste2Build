import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiX,
  FiCalendar,
  FiEdit3,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";

/* --------------------------- Layout --------------------------- */

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

const SecondaryBtn = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Note = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

/* --------------------------- Modal --------------------------- */

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

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 900;
`;

const InputWrap = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  align-items: center;
  background: #f8fafc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 12px;

  input,
  textarea {
    border: none;
    outline: none;
    width: 100%;
    background: transparent;
    font-size: 14px;
    resize: none;
  }

  textarea {
    min-height: 90px;
    line-height: 1.6;
  }
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
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

/* --------------------------- Mock Data --------------------------- */

const MOCK_LISTINGS = [
  {
    id: "1",
    title: "Clean PET Plastic Bottles",
    status: "available",
    seller: "Sarah Johnson",
    location: "Lagos, Nigeria",
    weightKg: 25,
    pricePerKg: 150,
    category: "Plastic",
    description:
      "Sorted and cleaned plastic bottles from household collection. Ready for recycling. Packed in sacks and stored indoors.",
  },
  {
    id: "2",
    title: "HDPE Plastic Containers",
    status: "available",
    seller: "Green Collectors Co.",
    location: "Abuja, Nigeria",
    weightKg: 40,
    pricePerKg: 180,
    category: "Plastic",
    description:
      "High-density polyethylene containers from small business. Clean, sorted, and bundled.",
  },
  {
    id: "3",
    title: "Mixed Plastic Bags",
    status: "pending",
    seller: "Student Eco Initiative",
    location: "Port Harcourt, Nigeria",
    weightKg: 15,
    pricePerKg: 120,
    category: "Plastic",
    description: "Collected plastic bags from neighborhood. Sorted and bundled.",
  },
  {
    id: "4",
    title: "PP Plastic Scraps",
    status: "available",
    seller: "Industrial Waste Solutions",
    location: "Kano, Nigeria",
    weightKg: 60,
    pricePerKg: 200,
    category: "Plastic",
    description: "Polypropylene plastic scraps from manufacturing. High quality material.",
  },
];

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = useMemo(() => {
    return MOCK_LISTINGS.find((x) => x.id === id) || MOCK_LISTINGS[0];
  }, [id]);

  const total = useMemo(() => listing.weightKg * listing.pricePerKg, [listing]);

  const [open, setOpen] = useState(false);
  const [pickup, setPickup] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const canAccept = listing.status === "available";

  const statusIcon = () => {
    if (listing.status === "available") return <FiCheckCircle />;
    if (listing.status === "pending") return <FiClock />;
    return <FiClock />;
  };

  const statusText = () => {
    if (listing.status === "available") return "Available";
    if (listing.status === "pending") return "Pending";
    return "Accepted";
  };

  const accept = () => {
    // UI-only pickupId generator
    const pickupId = `PU-${listing.id}-${Date.now().toString().slice(-6)}`;
    setOpen(false);
    navigate(`/pickup/${pickupId}`);
  };

  const onPickupChange = (key) => (e) => setPickup((p) => ({ ...p, [key]: e.target.value }));

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Listing Details</Title>
              <Sub>Review the listing information and accept to schedule a pickup with the seller.</Sub>
            </div>
            <Back to="/recycler/portal">
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
                  <Img />
                  <Img />
                  <Img />
                </ImageGrid>

                <MetaGrid>
                  <Meta>
                    <MetaTop>
                      <FiUser /> Seller
                    </MetaTop>
                    <MetaValue>{listing.seller}</MetaValue>
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
                    <MetaValue>{listing.weightKg} kg</MetaValue>
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
                    <span>Price per kg</span>
                    <strong>₦{listing.pricePerKg}</strong>
                  </SummaryRow>

                  <SummaryRow>
                    <span>Total weight</span>
                    <strong>{listing.weightKg} kg</strong>
                  </SummaryRow>

                  <Total>
                    <span>Total price</span>
                    <strong>₦{total.toLocaleString()}</strong>
                  </Total>
                </Summary>

                <Actions>
                  <PrimaryBtn type="button" onClick={() => setOpen(true)} disabled={!canAccept}>
                    <FiCheckCircle /> Accept Listing
                  </PrimaryBtn>

                  <SecondaryBtn to="/marketplace">
                    <FiBox /> Back to Marketplace
                  </SecondaryBtn>

                  <Note>
                    If a listing is pending, it means another recycler is already processing it.
                  </Note>
                </Actions>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Body>

      {open && (
        <Overlay role="dialog" aria-modal="true">
          <Modal>
            <ModalHead>
              <ModalTitle>Confirm Pickup Details</ModalTitle>
              <CloseBtn type="button" onClick={() => setOpen(false)} aria-label="Close">
                <FiX />
              </CloseBtn>
            </ModalHead>

            <ModalBody>
              <ModalText>
                Set a preferred pickup date and time. You can also add notes for the seller (example: “Call me on arrival”).
              </ModalText>

              <Field>
                <Label>Pickup Date</Label>
                <InputWrap>
                  <Icon><FiCalendar /></Icon>
                  <input type="date" value={pickup.date} onChange={onPickupChange("date")} />
                </InputWrap>
              </Field>

              <Field>
                <Label>Pickup Time</Label>
                <InputWrap>
                  <Icon><FiClock /></Icon>
                  <input type="time" value={pickup.time} onChange={onPickupChange("time")} />
                </InputWrap>
              </Field>

              <Field>
                <Label>Notes (optional)</Label>
                <InputWrap>
                  <Icon><FiEdit3 /></Icon>
                  <textarea
                    value={pickup.notes}
                    onChange={onPickupChange("notes")}
                    placeholder="Add pickup instructions..."
                  />
                </InputWrap>
              </Field>
            </ModalBody>

            <ModalFooter>
              <OutlineBtn type="button" onClick={() => setOpen(false)}>
                Cancel
              </OutlineBtn>
              <ConfirmBtn type="button" onClick={accept}>
                Confirm & Continue
              </ConfirmBtn>
            </ModalFooter>
          </Modal>
        </Overlay>
      )}
    </Page>
  );
}
