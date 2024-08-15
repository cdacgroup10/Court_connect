import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const MyWallet = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [walletAmount, setWalletAmount] = useState(user.walletAmount);
  const [walletRequest, setWalletRequest] = useState({
    userId: user.id,
    walletAmount: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setWalletRequest({ ...walletRequest, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getMyWallet = async () => {
      const myWallet = await retrieveMyWallet();
      if (myWallet) {
        setWalletAmount(myWallet);
      }
    };

    getMyWallet();
  }, []);

  const retrieveMyWallet = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/user/customer/wallet/fetch?userId=${user.id}`
    );
    return response.data;
  };

  const validateAmount = () => {
    const amount = parseFloat(walletRequest.walletAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number.");
      return false;
    }
    setError("");
    return true;
  };

  const addMoneyInWallet = (e) => {
    e.preventDefault();
    if (validateAmount()) {
      axios
        .post(`${API_BASE_URL}/api/user/add/wallet/money`, walletRequest, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const res = response.data;
          if (res.success) {
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
            }, 1000);
          } else {
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
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="mt-2 mb-4 d-flex aligns-items-center justify-content-center">
        <div className="card form-card border-color custom-bg" style={{ width: "25rem" }}>
          <div className="card-header bg-color text-center custom-bg-text mb-3">
            <h3>My Wallet</h3>
          </div>
          <h4 className="ms-3">Wallet Balance: Rs {walletAmount}</h4>

          <hr />

          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">Add Money In Wallet</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3 text-color">
                <label htmlFor="walletAmount" className="form-label">
                  <b>Amount</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="walletAmount"
                  onChange={handleInput}
                  value={walletRequest.walletAmount}
                  required
                />
                {error && <div className="text-danger">{error}</div>}
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={addMoneyInWallet}
              >
                Update Wallet
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
