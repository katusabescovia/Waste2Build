import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowLeft, FiUser, FiPhone, FiMapPin, FiCalendar, FiUpload, FiInfo, FiCheckCircle } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';





const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ─── Your original styles (100% unchanged) ─────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.div`
  background: linear-gradient(90deg, #0d9488, #047857);
  color: white;
  padding: 16px;
`;

const BackLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
`;

const Title = styled.h1`
  margin: 12px 0 4px;
  font-size: clamp(20px, 5.5vw, 22px);
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: clamp(13px, 3.8vw, 14px);
  opacity: 0.92;
`;

const Content = styled.div`
  max-width: 760px;
  margin: 24px auto 48px;
  padding: 0 12px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  overflow: hidden;
`;

const StepBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f1f5f9;
  border-bottom: 1px solid #e5e7eb;
  font-size: clamp(12px, 3.2vw, 13px);
  overflow-x: auto;
  white-space: nowrap;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: ${p => p.$active ? '700' : '500'};
  color: ${p => p.$active ? '#0d9488' : '#6b7280'};
  flex-shrink: 0;
`;

const StepCircle = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${p => p.$active ? '#0d9488' : p.$completed ? '#0d9488' : '#d1d5db'};
  color: white;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Body = styled.div`
  padding: 16px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(16px, 4.4vw, 17px);
  font-weight: 700;
  margin: 0 0 12px;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoIcon = styled(FiInfo)`
  color: #0d9488;
`;

const ImagePlaceholder = styled.div`
  height: 160px;
  background: #e5e7eb;
  border-radius: 8px;
  margin-bottom: 16px;
  background-size: cover;
  background-position: center;
`;

const ListingTitle = styled.h3`
  font-size: clamp(17px, 4.8vw, 18px);
  font-weight: 700;
  margin: 0 0 12px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  background: #ecfdf5;
  color: #0d9488;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: clamp(13px, 3.8vw, 14px);
`;

const DetailLabel = styled.div`
  color: #4b5563;
  font-weight: 500;
`;

const DetailValue = styled.div`
  font-weight: 600;
  color: #111827;
  text-align: right;
`;

const TotalContainer = styled.div`
  background: #f0fdfa;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  padding: 14px;
  margin: 16px 0;
`;

const TotalLabel = styled.div`
  color: #0f766e;
  font-size: clamp(13px, 3.6vw, 14px);
  margin-bottom: 4px;
`;

const TotalAmount = styled.div`
  font-size: clamp(20px, 5.8vw, 22px);
  font-weight: 700;
  color: #0f766e;
`;

const NoteText = styled.p`
  font-size: 12px;
  color: #0f766e;
  margin: 6px 0 0;
`;

const SellerSection = styled.div`
  margin-top: 24px;
`;

const SellerRow = styled(DetailRow)`
  align-items: flex-start;
  gap: 10px;
`;

const IconBox = styled.div`
  color: #0d9488;
  font-size: 18px;
  margin-top: 3px;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 15px;
  &:focus {
    outline: none;
    border-color: #0d9488;
    box-shadow: 0 0 0 3px rgba(13,148,136,0.1);
  }
`;

const PriceDisplay = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-top: 6px;
`;

const TotalBox = styled.div`
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
`;

const ActualTotal = styled.div`
  font-size: clamp(22px, 6vw, 26px);
  font-weight: 700;
  color: #0d9488;
  margin: 8px 0;
`;

const TotalNote = styled.p`
  font-size: 13px;
  color: #0d9488;
  margin: 4px 0 0;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  min-height: 80px;
  font-size: 15px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #0d9488;
    box-shadow: 0 0 0 3px rgba(13,148,136,0.1);
  }
`;

const UploadBox = styled.label`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 32px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0d9488;
    background: rgba(13,148,136,0.05);
  }
`;

const UploadText = styled.p`
  margin: 12px 0 4px;
  font-weight: 600;
  color: #374151;
`;

const UploadHint = styled.p`
  margin: 0;
  font-size: 13px;
  color: #6b7280;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;

  @media (min-width: 420px) {
    flex-direction: row;
  }
`;

const CancelBtn = styled(Link)`
  flex: 1;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  text-decoration: none;

  &:hover {
    background: #f3f4f6;
  }
`;

const ProceedBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: #0d9488;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #0f766e;
  }
`;

const BackBtn = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

const CompleteBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: #0d9488;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #0f766e;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const SuccessIcon = styled(FiCheckCircle)`
  font-size: 64px;
  color: #0d9488;
  margin-bottom: 16px;
`;

const SuccessTitle = styled.h2`
  font-size: clamp(22px, 6vw, 26px);
  font-weight: 700;
  margin: 0 0 12px;
  color: #111827;
`;

const SuccessText = styled.p`
  font-size: 15px;
  color: #4b5563;
  margin: 0 0 24px;
`;

const SummaryBox = styled.div`
  background: #f0fdfa;
  border: 1px solid #a7f3d0;
  border-radius: 10px;
  padding: 20px;
  margin: 24px 0;
  text-align: left;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid #e5e7eb;

  &:last-child { border-bottom: none; }
`;

const SummaryLabel = styled.div`
  color: #4b5563;
`;

const SummaryValue = styled.div`
  font-weight: 600;
  color: #0d9488;
`;

const NoteBox = styled.div`
  background: #f3f4f6;
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
  font-size: 14px;
  color: #4b5563;
`;

const ImpactTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px;
  color: #111827;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
`;

const ImpactCard = styled.div`
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
`;

const ImpactNumber = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #065f46;
`;

const ImpactLabel = styled.div`
  font-size: 14px;
  color: #065f46;
  margin-top: 4px;
`;

const ViewListingsBtn = styled(Link)`
  flex: 1;
  padding: 14px;
  background: #0d9488;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  text-decoration: none;

  &:hover { background: #0f766e; }
`;

const BrowseBtn = styled(Link)`
  flex: 1;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  text-decoration: none;

  &:hover { background: #f3f4f6; }
`;

// ─── Component ──────────────────────────────────────────────────────────────────
export default function PickupConfirmation() {
  const { pickupId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [actualWeight, setActualWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const [listing, setListing] = useState(null);

  // Fetch real accepted listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setSubmitError("Please log in to view this pickup");
          setLoading(false);
          return;
        }

        const res = await fetch(`${BASE_URL}/api/materials/my-accepted/${pickupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load accepted listing");
        }

        setListing(json.material);
        setLoading(false);
      } catch (err) {
        setSubmitError(err.message || "Could not load pickup details");
        setLoading(false);
      }
    };

    fetchListing();
  }, [pickupId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleProceed = () => {
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleComplete = async () => {
    setLoading(true);
    setSubmitError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("actualQuantity", actualWeight || listing.quantity); // fallback to estimated if empty
      formData.append("notes", notes);

      photos.forEach((file) => {
        formData.append("proofPhotos", file);
      });

      const res = await fetch(`${BASE_URL}/api/materials/${pickupId}/confirm-pickup`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to confirm pickup");
      }

      setStep(3);
    } catch (err) {
      setSubmitError(err.message || "Pickup confirmation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !listing) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading pickup details...</div>;
  if (submitError) return <div style={{ color: '#dc2626', textAlign: 'center', padding: '40px' }}>Error: {submitError}</div>;
  if (!listing) return <div style={{ textAlign: 'center', padding: '40px' }}>Pickup not found</div>;

  const estimatedTotal = listing.quantity * listing.pricePerUnit;
  const actualTotal = actualWeight ? Number(actualWeight) * listing.pricePerUnit : estimatedTotal;

  return (
    <Page>
      <Header>
        <BackLink to="/recycler/portal">
          <FiArrowLeft /> Back to My Accepted Listings
        </BackLink>

        <Title>Pickup Confirmation</Title>
        <Subtitle>Confirm the pickup details and actual quantity collected</Subtitle>
      </Header>

      <Content>
        <Card>
          <StepBar>
            <Step $active={step >= 1} $completed={step > 1}>
              <StepCircle $active={step >= 1} $completed={step > 1}>1</StepCircle>
              Review Details
            </Step>
            <Step $active={step >= 2} $completed={step > 2}>
              <StepCircle $active={step >= 2} $completed={step > 2}>2</StepCircle>
              Confirm Pickup
            </Step>
            <Step $active={step >= 3} $completed={step >= 3}>
              <StepCircle $active={step >= 3} $completed={step >= 3}>3</StepCircle>
              Complete
            </Step>
          </StepBar>

          {step === 1 && (
            <Body>
              <SectionTitle>Listing Details</SectionTitle>

              {listing.photo ? (
                <ImagePlaceholder style={{ backgroundImage: `url(${listing.photo})` }} />
              ) : (
                <ImagePlaceholder />
              )}

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <ListingTitle>{listing.title}</ListingTitle>
                <Badge>{listing.status}</Badge>
              </div>

              <DetailRow>
                <DetailLabel>Accepted Weight</DetailLabel>
                <DetailValue>{listing.quantity} {listing.unit}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Price per {listing.unit}</DetailLabel>
                <DetailValue>₦{Number(listing.pricePerUnit).toLocaleString()}</DetailValue>
              </DetailRow>

              <TotalContainer>
                <TotalLabel>Estimated Total Value</TotalLabel>
                <TotalAmount>₦{estimatedTotal.toLocaleString()}</TotalAmount>
                <NoteText>Final amount will be calculated based on actual weight collected</NoteText>
              </TotalContainer>

              <SellerSection>
                <SectionTitle>Seller Information</SectionTitle>

                <SellerRow>
                  <IconBox><FiUser /></IconBox>
                  <div style={{ flex: 1 }}>
                    <DetailLabel>Seller</DetailLabel>
                    <DetailValue>{listing.seller?.fullName || "Unknown Seller"}</DetailValue>
                  </div>
                </SellerRow>

                <SellerRow>
                  <IconBox><FiPhone /></IconBox>
                  <div style={{ flex: 1 }}>
                    <DetailLabel>Contact</DetailLabel>
                    <DetailValue>{listing.seller?.phone || "N/A"}</DetailValue>
                  </div>
                </SellerRow>

                <SellerRow>
                  <IconBox><FiMapPin /></IconBox>
                  <div style={{ flex: 1 }}>
                    <DetailLabel>Pickup Location</DetailLabel>
                    <DetailValue>{listing.location}</DetailValue>
                  </div>
                </SellerRow>

                <SellerRow>
                  <IconBox><FiCalendar /></IconBox>
                  <div style={{ flex: 1 }}>
                    <DetailLabel>Accepted On</DetailLabel>
                    <DetailValue>{new Date(listing.acceptedAt || Date.now()).toLocaleDateString()}</DetailValue>
                  </div>
                </SellerRow>
              </SellerSection>

              <ButtonRow>
                <CancelBtn to="/recycler/portal">Cancel</CancelBtn>
                <ProceedBtn onClick={handleProceed}>Proceed to Confirmation →</ProceedBtn>
              </ButtonRow>
            </Body>
          )}

          {step === 2 && (
            <Body>
              <SectionTitle>
                <InfoIcon /> Confirm Pickup Details
              </SectionTitle>

              <InputGroup>
                <Label>Actual Weight ({listing.unit})</Label>
                <Input
                  type="number"
                  placeholder={`e.g. ${listing.quantity}`}
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value)}
                  min="0"
                  step="0.1"
                />
                <PriceDisplay>Price per {listing.unit}: ₦{Number(listing.pricePerUnit).toLocaleString()}</PriceDisplay>
              </InputGroup>

              <InputGroup>
                <Label>Accepted Amount</Label>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {listing.quantity} {listing.unit}
                </div>
              </InputGroup>

              <TotalBox>
                <div style={{ fontSize: '14px', color: '#0d9488', marginBottom: 4 }}>
                  Calculated Total Amount
                </div>
                <ActualTotal>₦{actualTotal.toLocaleString()}</ActualTotal>
                <TotalNote>Will be final after seller confirmation</TotalNote>
              </TotalBox>

              <InputGroup>
                <Label>Notes (Optional)</Label>
                <Textarea
                  placeholder="Add any notes about the condition, quality, or issues..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </InputGroup>

              <SectionTitle>Upload Proof of Pickup (Optional)</SectionTitle>

              <UploadBox as="label">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <FiUpload size={32} color="#9ca3af" />
                <UploadText>Click to upload photos of collected materials</UploadText>
                <UploadHint>PNG, JPG or WEBP (max 5MB each)</UploadHint>
                {photos.length > 0 && (
                  <p style={{ marginTop: 8, color: '#0d9488' }}>
                    {photos.length} photo{photos.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </UploadBox>

              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: 12 }}>
                Photos help verify the pickup and build trust with sellers
              </div>

              {submitError && <div style={{ color: '#dc2626', textAlign: 'center', margin: '16px 0' }}>{submitError}</div>}

              <ButtonRow>
                <BackBtn onClick={handleBack}>← Back</BackBtn>
                <CompleteBtn onClick={handleComplete} disabled={loading}>
                  {loading ? 'Confirming...' : 'Complete Pickup'}
                </CompleteBtn>
              </ButtonRow>
            </Body>
          )}

          {step === 3 && (
            <Body style={{ padding: '32px 20px', textAlign: 'center' }}>
              <SuccessIcon />
              <SuccessTitle>Pickup Confirmed!</SuccessTitle>
              <SuccessText>
                The pickup has been successfully completed and recorded
              </SuccessText>

              <SummaryBox>
                <SummaryRow>
                  <SummaryLabel>Listing:</SummaryLabel>
                  <SummaryValue>{listing.title}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Actual Weight:</SummaryLabel>
                  <SummaryValue>{actualWeight || listing.quantity} {listing.unit}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Price per {listing.unit}:</SummaryLabel>
                  <SummaryValue>₦{Number(listing.pricePerUnit).toLocaleString()}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Total Amount:</SummaryLabel>
                  <SummaryValue style={{ fontSize: '20px', fontWeight: 700, color: '#0d9488' }}>
                    ₦{actualTotal.toLocaleString()}
                  </SummaryValue>
                </SummaryRow>
              </SummaryBox>

              <NoteBox>
                The seller has been notified and will receive payment. You can now view this completed transaction in your dashboard.
              </NoteBox>

              <ButtonRow>
                <ViewListingsBtn to="/recycler/my-accepted">View My Accepted Listings</ViewListingsBtn>
                <BrowseBtn to="/marketplace">Browse More Listings</BrowseBtn>
              </ButtonRow>

              <ImpactTitle>Your Environmental Impact</ImpactTitle>
              <ImpactGrid>
                <ImpactCard>
                  <ImpactNumber>{actualWeight || listing.quantity}</ImpactNumber>
                  <ImpactLabel>{listing.unit} Collected</ImpactLabel>
                </ImpactCard>
                <ImpactCard>
                  <ImpactNumber>{Number(actualWeight || listing.quantity) * 2}</ImpactNumber>
                  <ImpactLabel>Land Pollution Avoided (m²)</ImpactLabel>
                </ImpactCard>
                <ImpactCard>
                  <ImpactNumber>{Math.round((Number(actualWeight || listing.quantity)) * 0.18)}</ImpactNumber>
                  <ImpactLabel>CO₂ Emissions Prevented (kg)</ImpactLabel>
                </ImpactCard>
              </ImpactGrid>
            </Body>
          )}
        </Card>
      </Content>
    </Page>
  );
}