import { Link } from "react-router-dom";
const NotFound = () => (
    <main>
      <div className="wrap">
          <h2>Not Found</h2>
          <p>Sorry! We couldn't find the page you're looking for.</p>
          <Link className="button button-secondary" to={`/courses`} relative="path">Back to List</Link>
      </div>
   </main>
  );
  
  export default NotFound;