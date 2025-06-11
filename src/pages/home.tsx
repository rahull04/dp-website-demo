import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-[#5D87FF] mb-2">Welcome to Dp Website</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-6">
        Your one-stop platform for discovering skilled technicians, exploring job opportunities, and managing professional profiles seamlessly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h3 className="text-xl font-semibold text-[#5D87FF] mb-2">For Technicians</h3>
          <p className="text-sm text-gray-600">Create your profile, showcase your skills, and apply to jobs that suit your expertise.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h3 className="text-xl font-semibold text-[#5D87FF] mb-2">For Companies</h3>
          <p className="text-sm text-gray-600">Post job openings, browse technician profiles, and hire the best talent.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h3 className="text-xl font-semibold text-[#5D87FF] mb-2">Trusted Platform</h3>
          <p className="text-sm text-gray-600">Built to connect skilled professionals and businesses with ease and security.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
