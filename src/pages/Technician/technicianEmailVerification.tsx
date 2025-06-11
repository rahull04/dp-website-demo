import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyTechnician } from "../../store/slices/technicianSlice";

const TechnicianEmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerified(true);
    if (params.email) {
      dispatch(verifyTechnician(params.email));
    }
    setTimeout(() => {
      navigate("/technician/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        {!verified ? (
          <>
            <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
            <p className="mb-6 text-gray-600">
              A verification email has been sent to your inbox.
            </p>
            <button
              style={{ color: "white" }}
              onClick={handleVerify}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              I have verified
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-2 text-green-600">
              Email Verified!
            </h2>
            <p className="text-gray-500">Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianEmailVerification;
