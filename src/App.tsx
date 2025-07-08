import React from 'react';
import PredictionForm from './components/PredictionForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PredictionForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;