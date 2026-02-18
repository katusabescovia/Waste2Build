import { useMemo, useState } from "react";
import styled from "styled-components";
import { FiUploadCloud, FiMapPin, FiTag, FiFileText, FiBox, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";

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

const Back = styled(Link)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
`;

const Body = styled.section`
  padding: 22px 0 0;
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
`;

const CardTitle = styled.div`
  font-weight: 900;
`;

const CardSub = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const UploadBox = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #f8fafc;
  padding: 18px;
  display: grid;
  gap: 10px;
`;

const UploadIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #eafff1;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  place-items: center;
  font-size: 24px;
`;

const UploadTitle = styled.div`
  font-weight: 900;
`;

const UploadText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const UploadBtn = styled.label`
  width: fit-content;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Preview = styled.div`
  height: 78px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  background: #e2e8f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  margin: 0 0 6px;
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

  select,
  input,
  textarea {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
    resize: none;
  }

  textarea {
    min-height: 96px;
    line-height: 1.6;
  }
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const Summary = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #fff;
  padding: 14px;
  display: grid;
  gap: 8px;
`;

const SummaryTitle = styled.div`
  font-weight: 900;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Submit = styled.button`
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 900;
  transition: 0.2s ease;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Note = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

export default function CreateListing() {
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "plastic",
    description: "",
    location: "",
    weightKg: "",
    pricePerKg: "",
  });

  const onChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const totalPrice = useMemo(() => {
    const w = Number(form.weightKg);
    const p = Number(form.pricePerKg);
    if (!w || !p) return 0;
    return w * p;
  }, [form.weightKg, form.pricePerKg]);

  const canSubmit = useMemo(() => {
    if (!form.title) return false;
    if (!form.description) return false;
    if (!form.location) return false;
    if (!form.weightKg || Number(form.weightKg) <= 0) return false;
    if (!form.pricePerKg || Number(form.pricePerKg) <= 0) return false;
    return true;
  }, [form]);

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files || []);
    const next = files.slice(0, 6).map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setPhotos(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only for now — we will connect axios + backend after all screens are done.
    alert("Listing created (UI only). Next we will connect backend!");
  };

  return (
    <Page>
      <Header>
        <Container>
          <HeadRow>
            <div>
              <Title>Create Listing</Title>
              <Sub>Add your recyclable materials so recyclers can find and buy them.</Sub>
            </div>
            <Back to="/seller/dashboard">Back to Dashboard</Back>
          </HeadRow>
        </Container>
      </Header>

      <Body>
        <Container>
          <Card>
            <CardHead>
              <CardTitle>Listing Information</CardTitle>
              <CardSub>Fill in the details below. Clear photos help your listing sell faster.</CardSub>
            </CardHead>

            <CardBody>
              <Grid>
                <div>
                  <UploadBox>
                    <UploadIcon>
                      <FiUploadCloud />
                    </UploadIcon>

                    <div>
                      <UploadTitle>Upload Photos</UploadTitle>
                      <UploadText>
                        Add up to 6 photos. Use clear images so recyclers can see the material condition.
                      </UploadText>
                    </div>

                    <UploadBtn>
                      Choose Images
                      <HiddenInput type="file" accept="image/*" multiple onChange={handlePhotos} />
                    </UploadBtn>

                    <PreviewGrid>
                      {photos.length === 0 ? (
                        <>
                          <Preview />
                          <Preview />
                          <Preview />
                        </>
                      ) : (
                        photos.slice(0, 3).map((p, idx) => (
                          <Preview key={idx}>
                            <img src={p.url} alt={`preview-${idx}`} />
                          </Preview>
                        ))
                      )}
                    </PreviewGrid>

                    <Note>
                      Tip: Take photos in daylight. Avoid blurry shots. Show the full material and close-up details.
                    </Note>
                  </UploadBox>
                </div>

                <div>
                  <Form onSubmit={handleSubmit}>
                    <Field>
                      <Label>Listing Title</Label>
                      <InputWrap>
                        <Icon><FiTag /></Icon>
                        <input value={form.title} onChange={onChange("title")} placeholder="e.g., Clean PET Plastic Bottles" />
                      </InputWrap>
                    </Field>

                    <Row2>
                      <Field>
                        <Label>Category</Label>
                        <InputWrap>
                          <Icon><FiBox /></Icon>
                          <select value={form.category} onChange={onChange("category")}>
                            <option value="plastic">Plastic</option>
                            <option value="metal">Metal</option>
                            <option value="paper">Paper</option>
                            <option value="glass">Glass</option>
                            <option value="other">Other</option>
                          </select>
                        </InputWrap>
                      </Field>

                      <Field>
                        <Label>Location</Label>
                        <InputWrap>
                          <Icon><FiMapPin /></Icon>
                          <input value={form.location} onChange={onChange("location")} placeholder="e.g., Ikeja, Lagos" />
                        </InputWrap>
                      </Field>
                    </Row2>

                    <Field>
                      <Label>Description</Label>
                      <InputWrap>
                        <Icon><FiFileText /></Icon>
                        <textarea
                          value={form.description}
                          onChange={onChange("description")}
                          placeholder="Describe the materials: condition, sorting, packaging, and any extra details..."
                        />
                      </InputWrap>
                    </Field>

                    <Row2>
                      <Field>
                        <Label>Weight (kg)</Label>
                        <InputWrap>
                          <Icon><FiBox /></Icon>
                          <input
                            type="number"
                            value={form.weightKg}
                            onChange={onChange("weightKg")}
                            placeholder="e.g., 25"
                            min="0"
                          />
                        </InputWrap>
                      </Field>

                      <Field>
                        <Label>Price per kg (₦)</Label>
                        <InputWrap>
                          <Icon><FiDollarSign /></Icon>
                          <input
                            type="number"
                            value={form.pricePerKg}
                            onChange={onChange("pricePerKg")}
                            placeholder="e.g., 150"
                            min="0"
                          />
                        </InputWrap>
                      </Field>
                    </Row2>

                    <Summary>
                      <SummaryTitle>Pricing Summary</SummaryTitle>
                      <SummaryRow>
                        <span>Total weight</span>
                        <strong>{form.weightKg ? `${form.weightKg} kg` : "—"}</strong>
                      </SummaryRow>
                      <SummaryRow>
                        <span>Price per kg</span>
                        <strong>{form.pricePerKg ? `₦${Number(form.pricePerKg).toLocaleString()}` : "—"}</strong>
                      </SummaryRow>
                      <SummaryRow>
                        <span>Total price</span>
                        <strong>{totalPrice ? `₦${totalPrice.toLocaleString()}` : "—"}</strong>
                      </SummaryRow>
                    </Summary>

                    <Submit type="submit" disabled={!canSubmit}>
                      Create Listing
                    </Submit>

                    <Note>
                      After creating, your listing will appear on the marketplace and recyclers can accept it.
                    </Note>
                  </Form>
                </div>
              </Grid>
            </CardBody>
          </Card>
        </Container>
      </Body>
    </Page>
  );
}
