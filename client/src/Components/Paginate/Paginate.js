import "./Paginate.css";
import leftarrow from "../../Images/leftarrow.png";
import rightarrow from "../../Images/rightarrow.png";

const Paginate = ({
  contactsPerPage,
  totalContacts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }
  const previouspage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  const nextpage = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };
  return (
    <div>
      <div className="pagination">
        <img src={leftarrow} alt="" onClick={previouspage} />
        {pageNumbers.map((number) => {
          return (
            <span onClick={() => paginate(number)} className="page-link">
              {number}
            </span>
          );
        })}
        <img src={rightarrow} alt="" onClick={nextpage} />
      </div>
    </div>
  );
};

export default Paginate;
