import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const MyAuctions = () => {
  const { user } = useAuthContext();
  const [auctions, setAuctions] = useState([]);

  const email = user.email;

  useEffect(() => {
    const fetchAuctions = async () => {
      const res = await axios.get(`/api/auction/myauctions/${email}`);
      setAuctions(res.data);
    };
    fetchAuctions();
  }, [email]);

  return (
    <div class="job-listings-container">
      <h1>My Auctions:</h1>
      <ul class="job-listings">
        {auctions.map((auction) => (
          <li class="job-listing" key={auction._id}>
            <div class="job-title">{auction.jobTitle}</div>
            <div class="job-description">{auction.jobDescription}</div>
            <div class="job-location">Location: {auction.jobLocation}</div>
            <div class="job-amount">Base Amount: {auction.baseAmount}</div>
            <div class="job-exp">
              Experience Required: {auction.jobExpRequired}
            </div>
            <div class="job-availability">
              Availability: {auction.available}
            </div>
            <Link to={`/auctions/${auction._id}`} class="job-view-link">
              View
            </Link>
          </li>
        ))}
        {/* if no auctions found print No auctiosn found */}
        {auctions.length === 0 && <h3>No auctions found</h3>}
      </ul>
    </div>
  );
};

export default MyAuctions;
