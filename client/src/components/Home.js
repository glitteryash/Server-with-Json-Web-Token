import React from 'react';

const Home = () => {
  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 rounded-lg bg-gray-100 p-5">
          <div className="px-4 py-5">
            <h1 className="text-4xl font-bold">Learning System</h1>
            <p className="my-5 text-xl">
              This system is using React.js as front-end framework, and Node.js, MongoDB as backend
              server. This kind of project is called MERN project, which is one of the most popular
              way to create modern websites.
            </p>
            <button
              className="rounded-3xl bg-indigo-500 px-6 py-3 text-lg font-semibold text-white hover:bg-indigo-700"
              type="button"
            >
              See how it works
            </button>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap md:items-stretch md:gap-6">
          <div className="w-full md:w-1/2">
            <div className="h-full rounded-xl bg-gray-900 p-10 text-white">
              <h2 className="text-xl font-bold text-white">As a student</h2>
              <p>
                Students can register in courses they like. This website is for practice purpose
                only, so please do not provide any personal information, such as credit card
                numbers.
              </p>
              <button
                className="my-4 rounded-3xl bg-white px-4 py-3 text-black hover:bg-gray-200 focus:outline-none"
                type="button"
              >
                Login or Register Now
              </button>
            </div>
          </div>
          <div className="mt-4 w-full md:mt-0 md:w-1/2">
            <div className="h-full rounded-xl border border-gray-300 bg-gray-100 p-10">
              <h2 className="text-xl font-bold text-black">As an Instructor</h2>
              <p>
                You can become an instructor by registering as one, and start making online courses.
                This website is for practice purpose only, so please do not provide any personal
                information, such as credit card numbers.
              </p>
              <button
                className="my-4 rounded-3xl border-gray-900 bg-gray-900 px-4 py-3 text-gray-50 hover:bg-gray-700 focus:outline-none"
                type="button"
              >
                Login or Register Now
              </button>
            </div>
          </div>
        </div>

        <footer className="text-muted border-top mt-4 pt-3">&copy; 2025 POCHUANG LIU</footer>
      </div>
    </main>
  );
};

export default Home;
