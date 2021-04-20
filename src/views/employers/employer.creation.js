import React from 'react';
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
  CInputFile,
  CCardFooter,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const EmployerCreation = () => {
  return (
    <>
      <CRow xl={12}>
        <CCol xl={12} sm="6">
          <CCard>
            <CCardHeader>
              Employer Creation
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="clientName">Employer Name</CLabel>
                <CInput
                  id="clientName"
                  placeholder="Enter your employer name"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email-input">Email Input</CLabel>
                <CInput
                  type="email"
                  id="email-input"
                  name="email-input"
                  placeholder="Enter Email"
                  autoComplete="email"
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="street">Street</CLabel>
                <CInput id="street" placeholder="Enter street name" />
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="8">
                  <CFormGroup>
                    <CLabel htmlFor="city">City</CLabel>
                    <CInput id="city" placeholder="Enter your city" />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="postal-code">Postal Code</CLabel>
                    <CInput id="postal-code" placeholder="Postal Code" />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="country">Country</CLabel>
                <CInput id="country" placeholder="Country name" />
              </CFormGroup>
              <CFormGroup row>
                <CLabel col md="2" htmlFor="file-input">
                  Login upload
                </CLabel>
                <CCol xs="12" md="10">
                  <CInputFile id="file-input" name="file-input" />
                </CCol>
              </CFormGroup>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary">
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
              </CCardFooter>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EmployerCreation;
