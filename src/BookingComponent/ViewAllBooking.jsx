import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ViewAllBooking = () => {
  const [allBookings, setAllBookings] = useState([]);

  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking.bookings);
      }
    };

    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/book/ground/fetch/all`
    );
    console.log(response.data);
    return response.data;
  };

  const updateBookingStatus = (bookingId) => {
    fetch(`${API_BASE_URL}/api/book/ground/update/status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: bookingId,
        status: "Cancel",
      }),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.success) {
          console.log("Got the success response");

          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        } else {
          console.log("Didn't got success response");
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        }
      });
    });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Bookings</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Ground</th>
                  <th scope="col">Ground Name</th>
                  <th scope="col">Booking Id</th>
                  <th scope="col">Event</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Booking Time Slot</th>
                  <th scope="col">Booking Status</th>
                  <th scope="col">Total Payable Amount</th>
                  <th scope="col">Event Paid Amount</th>
                  <th scope="col">Verify Booking Status</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            `${API_BASE_URL}/api/ground/` +
                            booking.groundImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>

                      <td>
                        <b>{booking.groundName}</b>
                      </td>
                      <td>
                        <b>{booking.bookingId}</b>
                      </td>
                      <td>
                        <b>{booking.event ? booking.event.name : "-"}</b>
                      </td>
                      <td>
                        <b>{booking.customerName}</b>
                      </td>
                      <td>
                        <b>{booking.customerContact}</b>
                      </td>

                      <td>
                        <b>{booking.date}</b>
                      </td>
                      <td>
                        <b>{booking.timeSlot}</b>
                      </td>
                      <td>
                        <b>{booking.status}</b>
                      </td>

                      <td>
                        <b>{booking.price}</b>
                      </td>
                      <td>
                        <b>{booking.eventPaidAmount}</b>
                      </td>
                      <td>
                        {(() => {
                          if (booking.status === "Pending") {
                            return (
                              <Link
                                to={`/user/admin/verify/booking/${booking.id}`}
                                className="btn btn-sm bg-color custom-bg-text"
                                aria-current="page"
                              >
                                <b>Verify Booking</b>
                              </Link>
                            );
                          }
                        })()}

                        {(() => {
                          if (booking.status === "Approved & Advance Paid") {
                            return (
                              <button
                                onClick={() => updateBookingStatus(booking.id)}
                                className="btn btn-sm bg-color custom-bg-text"
                              >
                                <b>Cancel Booking</b>
                              </button>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllBooking;
