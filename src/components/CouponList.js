import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CouponList() {
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState([]);

  const handleEditClick = (couponId) => {
    // Redirect to the 'editCoupon' route with the couponId parameter
    navigate(`/editCoupon/${couponId}`);
  };

  const handleDeleteClick = async (couponId) => {
    var confirmed = window.confirm("Are you sure you really want to delete the coupon?");
  
    if (confirmed) {
      try {
        const jwtToken = localStorage.getItem('authToken');
        const apiUrl = `http://localhost:46544/api/admin/coupon/delete/${couponId}`;
  
        const response = await axios.post(apiUrl, couponId, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.data.success) {
          alert(response.data.message);
          fetchData(); // Fetch the updated data after successful deletion
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Delete API Error:', error);
      }
    }
  };
  

  const fetchData = async () => {
    const apiUrl = "http://localhost:46544/api/admin/coupon/list";
    const jwtToken = localStorage.getItem("authToken");

    try {
      const modelData = {
        pageNumber: 1,
        pageSize: 100,
        sortColumn: "",
        sortOrder: "",
        strSearch: "",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(modelData),
      });

      if (response.ok) {
        const data = await response.json();
        setCouponData(data.data);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Call the function
    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <>
      <div className="text-center">
        <h2>Coupon List</h2>
      </div>
      <div className="container mt-3">
        <table border="1" className="table table-dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Start Date</th>
              <th>Expire Date</th>
              <th>Coupon Type</th>
              <th>Discount Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {couponData.map((coupon) => (
              <tr key={coupon.couponCodeId}>
                <td>{coupon.rowNumber}</td>
                <td>{coupon.couponCode}</td>
                <td>{coupon.startDateOfCoupon}</td>
                <td>{coupon.expireDateOfCoupon}</td>
                <td>{coupon.couponType === 1 ? "General" : "Special"}</td>
                <td>
                  {coupon.discountType === 1
                    ? `${coupon.discountAmountORPercentage}%`
                    : `$${coupon.discountAmountORPercentage}`}
                </td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEditClick(coupon.couponCodeId)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(coupon.couponCodeId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
