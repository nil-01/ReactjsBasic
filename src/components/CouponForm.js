import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import './Login.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CouponForm() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { couponId } = useParams();

  const getValue = (event) => {
    setText(event.target.value);
  };

  const setUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const setLowercase = () => {
    setText(text.toLowerCase());
  };

  const [formData, setFormData] = useState({
    CouponCode: "",
    StartDateOfCoupon: "",
    ExpireDateOfCoupon: "",
    CouponType: "",
    DiscountAmountORPercentage: "",
    DiscountType: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (couponId) {
        try {
          const jwtToken = localStorage.getItem('authToken');
          const response = await axios.get(`http://localhost:46544/api/admin/coupon/getcoupon/${couponId}`, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          });

          const couponData = response.data.data || {}; 
          setFormData({
            CouponCode: couponData.couponCode || "",
            StartDateOfCoupon: couponData.startDateOfCoupon ? new Date(couponData.startDateOfCoupon) : null,
            ExpireDateOfCoupon: couponData.expireDateOfCoupon ? new Date(couponData.expireDateOfCoupon) : null,
            CouponType: couponData.couponType ? couponData.couponType.toString() : "",
            DiscountAmountORPercentage: couponData.discountAmountORPercentage ? couponData.discountAmountORPercentage.toString() : "",
            DiscountType: couponData.discountType ? couponData.discountType.toString() : "",
          });
        } catch (error) {
          console.error("Error fetching coupon data:", error);
        }
      }
    };

    fetchData();
  }, [couponId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem('authToken');
      var CouponModel = {
        CouponCodeId: 0 || Number.parseInt(couponId),
        CouponCode: formData.CouponCode,
        StartDateOfCoupon: formData.StartDateOfCoupon,
        ExpireDateOfCoupon: formData.ExpireDateOfCoupon,
        CouponType: Number.parseInt(formData.CouponType),
        DiscountAmountORPercentage: Number.parseInt(formData.DiscountAmountORPercentage),
        DiscountType: Number.parseInt(formData.DiscountType)
      }
      const response = await axios.post("http://localhost:46544/api/admin/coupon/save", CouponModel, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate("/coupons");
        couponId = 0;
      } else {
        alert(response.data.message);
      }

      setFormData({
        CouponCode: "",
        StartDateOfCoupon: "",
        ExpireDateOfCoupon: "",
        CouponType: "",
        DiscountAmountORPercentage: "",
        DiscountType: "",
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <>
      {/* <div className="container">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Type Something
          </label>
          <input
            type="text"
            value={text}
            onChange={getValue}
            className="form-control"
          />
          <div className="form-text">Let's Use Some UseState Hook</div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary me-3" onClick={setUppercase}>
            Convert To Uppercase
          </button>
          <button className="btn btn-primary" onClick={setLowercase}>
            Convert To Lowercase
          </button>
        </div>
      </div> */}


      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 border border-secondary rounded"
        >
        <h1 className="text-center"> Coupon Form</h1>
          <div className="mb-3">
            <label htmlFor="CouponCode" className="form-label">
              Coupon Code:
            </label>
            <input
              type="text"
              className="form-control"
              id="CouponCode"
              name="CouponCode"
              value={formData.CouponCode}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="StartDateOfCoupon" className="form-label">
              Start Date of Coupon:
            </label>
            <br/>
            <DatePicker
              selected={formData.StartDateOfCoupon}
              onChange={(date) => handleDateChange(date, 'StartDateOfCoupon')}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ExpireDateOfCoupon" className="form-label">
              Expire Date of Coupon:
            </label>
            <br/>
            <DatePicker
              selected={formData.ExpireDateOfCoupon}
              onChange={(date) => handleDateChange(date, 'ExpireDateOfCoupon')}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="CouponType" className="form-label">
              Coupon Type:
            </label>
            <select
              className="form-select"
              id="CouponType"
              name="CouponType"
              value={formData.CouponType}
              onChange={handleChange}
            >
              <option value="">Select Coupon Type</option>
              <option value='1'>Special</option>
              <option value='2'>General</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="DiscountAmountORPercentage" className="form-label">
              Discount Amount or Percentage:
            </label>
            <input
              type="text"
              className="form-control"
              id="DiscountAmountORPercentage"
              name="DiscountAmountORPercentage"
              value={formData.DiscountAmountORPercentage}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="DiscountType" className="form-label">
              Discount Type:
            </label>
            <select
              className="form-select"
              id="DiscountType"
              name="DiscountType"
              value={formData.DiscountType}
              onChange={handleChange}
            >
              <option value="">Select Discount Type</option>
              <option value="1">Flat</option>
              <option value="2">Percentage</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
