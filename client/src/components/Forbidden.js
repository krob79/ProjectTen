
import { Link } from 'react-router-dom';
const Forbidden = () => (
    <main>
      <div className="wrap">
          <h2>Forbidden</h2>
          <p>You don't have permission to enter this section.</p>
          <Link className="button button-secondary" to={`/courses`} relative="path">Return to List</Link>
      </div>
   </main>
  );
  
  export default Forbidden;