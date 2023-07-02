import * as React from "react";
import { useEffect, useState } from "react";
import {
  CCard,
  CCardBody, CCardHeader, CNavLink,
  CRow,
  CTable,
  CTableBody, CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";


const Stock = () => {
  const [exchanges, setExchanges] = useState([]);

  useEffect( () => {
    getExchanges()
  }, []);

  const getExchanges = async () => {
    const localExchanges = localStorage.getItem("exchanges");
    if (localExchanges) {
      setExchanges(JSON.parse(localExchanges))
    } else {
      const url = 'http://api.marketstack.com/v1/exchanges'
      const access_key = 'e4aad7d222159e76b0073dd22e9d4f55'
      const limit = 1000;
      const response = await axios.get(url, {
        params: { access_key, limit }
      })
      let data = response?.data?.data.sort((a, b)=> a?.country?.localeCompare(b?.country));
      console.log(data.map(item => item.country).sort((a, b)=> a?.localeCompare(b)));
      setExchanges(data)
      localStorage.setItem("exchanges", JSON.stringify(data))
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Exchanges</CCardHeader>
      <CCardBody>
        <CRow>
          <CTable align="middle" striped borderless small hover responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Acronym</CTableHeaderCell>
                <CTableHeaderCell>MIC</CTableHeaderCell>
                <CTableHeaderCell>Country</CTableHeaderCell>
                <CTableHeaderCell>City</CTableHeaderCell>
                <CTableHeaderCell>Website</CTableHeaderCell>
                <CTableHeaderCell>Currency</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {exchanges.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell align="center">{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.acronym}</CTableDataCell>
                  <CTableDataCell>{item.mic}</CTableDataCell>
                  <CTableDataCell>{item.country}</CTableDataCell>
                  <CTableDataCell>{item.city}</CTableDataCell>
                  <CTableDataCell><a href={item.website}>{item.website}</a></CTableDataCell>
                  <CTableDataCell>{item?.currency?.code}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default Stock;
