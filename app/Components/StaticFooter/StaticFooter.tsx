const StaticFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="
        w-full 
        py-4 
        border-t 
        border-gray-800
        mt-auto
      ">
        <div className="
          max-w-6xl 
          mx-auto 
          flex 
          justify-center 
          items-center
        ">
          <p className="text-sm text-gray-400">
            © {currentYear} Shubh Sheth. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default StaticFooter;