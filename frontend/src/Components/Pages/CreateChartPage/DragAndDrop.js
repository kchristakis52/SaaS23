import React from "react";
import { Button, Snackbar } from "@mui/material";
import "./DragAndDrop.css";
import UploadIcon from "@mui/icons-material/Upload";

function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [uploadSuccess, setUploadSuccess] = React.useState(false); // Track upload success

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      // Check file extension
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension !== "csv") {
        setErrorMessage("Invalid file format. Please upload a CSV file.");
        setErrorAlertOpen(true);
        return;
      }

      // Check file mime type
      const fileMimeType = file.type;
      if (
        fileMimeType !== "text/csv" &&
        fileMimeType !== "application/vnd.ms-excel"
      ) {
        setErrorMessage("Invalid file format. Please upload a CSV file.");
        setErrorAlertOpen(true);
        return;
      }
      const url = `http://localhost:3001/parse-csv?chtype=${encodeURIComponent(
        localStorage["selectedChartTypeforBackend"]
      )}&user=${encodeURIComponent(localStorage["email"])}`;
      const params = new URLSearchParams(window.location.search);
      const username = params.get("username");
      const email = params.get("email");
      const formData = new FormData();
      formData.append("csv", file);
      console.log(username);
      formData.append("email", email);
      formData.append("user", username);
      formData.append("chtype", localStorage["selectedChartType"]);

      fetch(url, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
        .then((response) => {
          console.log(response.status);
          if (response.ok) {
            return response.json();
          } else {
            setErrorAlertOpen(true);
          }
        })
        .then((data) => {
          console.log("Response status:", data.status);
          console.log(data);
          if (data.status === "success") {
            setUploadSuccess(true); // Set upload success status
            // Handle the response from the backend
            console.log(localStorage["username"]);
          } else {
            setErrorAlertOpen(true);
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorAlertOpen(true);
        });
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      //handleFiles(e.target.files);
      const formData = new FormData();
      formData.append("csv", e.dataTransfer.files[0]);
      formData.append("user", localStorage["username"]);
      formData.append("chtype", localStorage["selectedChartType"]);

      fetch("http://localhost:3001/parse-csv?chtype=pieq&user=kwstas", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
        .then((response) => {
          if (response.ok) {
            // Handle the response from the backend
            setUploadSuccess(true); // Set upload success status
            console.log(response.status);
            // Redirect to yourchart page or handle the response accordingly
          } else {
            setErrorAlertOpen(true);
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
          setErrorAlertOpen(true);
        });
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleAlertClose = () => {
    setErrorAlertOpen(false);
  };

  React.useEffect(() => {
    if (uploadSuccess) {
      //window.location.href = `http://localhost:4007/yourchart?username=${encodeURIComponent(
      //localStorage.getItem("username")
      //)}`;
    }
  }, [uploadSuccess]);

  return (
    <div>
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <Button
          id="form-Button"
          variant="contained"
          color="success"
          onClick={() =>
            (window.location.href = `http://localhost:4007/yourchart?username=${encodeURIComponent(
              localStorage.getItem("username")
            )}`)
          }
          startIcon={<UploadIcon />}
        >
          Upload and create chart
        </Button>
        <Button
          id="form-Button"
          s
          variant="contained"
          color="success"
          onClick={() =>
            (window.location.href = `http://localhost:4007/newchart?username=${encodeURIComponent(
              localStorage.getItem("username")
            )}`)
          }
        >
          Cancel
        </Button>
      </form>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        message={errorMessage}
      />
    </div>
  );
}

export default DragDropFile;
