// Smart Education Chatbot - Main Index Page redirects to Chat
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main chat page
    navigate('/');
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-bg">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-white">SE</span>
        </div>
        <p className="text-muted-foreground">Loading Smart Education...</p>
      </div>
    </div>
  );
};

export default Index;
