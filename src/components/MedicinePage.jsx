import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import checkAuth from "./auth/checkAuth";

function MedicineTracker() {
  const [medicines, setMedicines] = useState([]); /* list of medicines specific to the user*/
  const [medicineName, setMedicineName] = useState("");/*input for adding new medicine name */
  const [medicineStock, setMedicineStock] = useState("");/*input for adding new medicine stock */
  const [editIndex, setEditIndex] = useState(null);/*tracks which medicine is being edited*/
  const [editedName, setEditedName] = useState("");/*store the edited name */
  const [editedStock, setEditedStock] = useState("");/*store the edited stock */
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesPerPage] = useState(2);
// fetching saved medicines on load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const userEmail = loggedInUser.email;
      const savedMedicines =
        JSON.parse(localStorage.getItem("medicines_" + userEmail)) || [];
      setMedicines(savedMedicines);
    }
  }, []);
// formatting date and time to a readable format
  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };
// add medicine
  const addMedicine = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      setError("User not logged in!");
      return;
    }

    const userEmail = loggedInUser.email;
    if (medicines.length >= 5) {
      setError("You can only add up to 5 medicines.");
      return;
    }

    if (medicineName.trim() && medicineStock > 0) {
      const newMedicine = {
        name: medicineName,
        stock: medicineStock,
        dateTime: formatDateTime(new Date()),
      };

      const updatedMedicines = [...medicines, newMedicine];
      setMedicines(updatedMedicines);

      localStorage.setItem(
        "medicines_" + userEmail,
        JSON.stringify(updatedMedicines)
      );
      setMedicineName("");
      setMedicineStock("");
      setError("");
    }
  };
// delete medicines
  const deleteMedicine = (index) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      setError("User not logged in!");
      return;

    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
  );

  if (confirmDelete){

  

    const userEmail = loggedInUser.email;
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);

    localStorage.setItem(
      "medicines_" + userEmail,
      JSON.stringify(updatedMedicines)
    );
  }
  };
// update medicines
  const startEdit = (index) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      setError("User not logged in!");
      return;
    }

    const globalIndex = index + (currentPage - 1) * medicinesPerPage;
    setEditIndex(globalIndex);
    const medicine = medicines[globalIndex];
    setEditedName(medicine.name);
    setEditedStock(medicine.stock);
  };

  const saveEdit = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      setError("User not logged in!");
      return;
    }
// if the current index matches the edited index give an object with updated details
    const updatedMedicines = medicines.map((medicine, i) =>     
      i === editIndex
        ? { ...medicine, name: editedName, stock: editedStock }
        : medicine
    );
    setMedicines(updatedMedicines);

    const userEmail = loggedInUser.email;
    localStorage.setItem(
      "medicines_" + userEmail,
      JSON.stringify(updatedMedicines)
    );
    setEditIndex(null);
    setEditedName("");
    setEditedStock("");
  };
// case sesitive comparison 
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );
// then do the pagination and using slice method the medicines should be displayed in the current page is selected
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = filteredMedicines.slice(
    indexOfFirstMedicine,
    indexOfLastMedicine
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      id="mainPage"
      className="d-flex flex-column align-items-center maincard"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeInBackground 1.5s ease-in-out",
      }}
    >
      <Navbar />
      <div
        className="card shadow-lg p-4 mt-5"
        style={{
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.85)",
          width: "80%",
          maxWidth: "900px",
          animation: "fadeInCard 1s ease-out",
        }}
      >
        <h2 className="cardm text-center mb-4 font-weight-bold" id="heading">Medicine Management</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="Enter Medicine Name"
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              value={medicineStock}
              onChange={(e) => setMedicineStock(e.target.value)}
              placeholder="Enter Available Stock"
            />
          </div>
        </div>
        <button className="btn mb-3 w-100 font-weight-bold btnAdd" onClick={addMedicine}>
          Add Medicine
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          type="text"
          className="form-control mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Medicine"
        />
        <div className="row">
          {currentMedicines.map((medicine, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="card shadow-sm font-weight-bold">
                <div className="card-body">
                  {editIndex === index + (currentPage - 1) * medicinesPerPage ? (
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control mr-2"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                      <input
                        type="number"
                        className="form-control mr-2"
                        value={editedStock}
                        onChange={(e) => setEditedStock(e.target.value)}
                      />
                      <button className="btn btn-success font-weight-bold" onClick={saveEdit}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary ml-2 font-weight-bold"
                        onClick={() => setEditIndex(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5>{medicine.name}</h5>
                        <p className="text-muted small">{medicine.dateTime}</p>
                        <p className="mb-0">Stock: {medicine.stock}</p>
                      </div>
                      <div>
                        <button
                          className="btn btn-primary btn-sm mr-2 font-weight-bold"
                          onClick={() => startEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm font-weight-bold"
                          onClick={() =>
                            deleteMedicine(
                              index + (currentPage - 1) * medicinesPerPage
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-secondary font-weight-bold"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-weight-bold">Page {currentPage}</span>
          <button
            className="btn btn-secondary font-weight-bold"
            onClick={() => paginate(currentPage + 1)}
            // disable the button if it is in the last page
            disabled={currentPage ===Math.ceil(filteredMedicines.length / medicinesPerPage)}
          >
            Next
          </button>
        </div>

      </div>

      <style>
        {`
          @keyframes fadeInBackground {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes fadeInCard {
            0% {
              transform: translateY(30px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
            #heading{
            color:#00796b;
            }
            .btnAdd{
            background: #00796b;
            color:#fff;
           
            
            }
            
        `}
      </style>
      <footer className="footer footer-expand-lg footer-dark footer-transparent fixed-bottom">
        <div className="container text-center">
          <p className="mb-0 font-weight-bold">&copy; 2025 EasyPharm. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default checkAuth(MedicineTracker);
