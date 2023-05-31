import React from "react";
import { Button, Snackbar } from "@mui/material";

function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);

  // handle drag eventse
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
      // handleFiles(e.dataTransfer.files);
      const formData = new FormData();
      console.log(e.dataTransfer.files);
      formData.append("file", e.dataTransfer.files[0]);

      fetch("/backend/chart-endpoint", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Handle succesful response from the backend
            console.log(response);
            // Redirect to yourchart page or handle the response accordingly
            window.location.href = "/yourchart";
          } else {
            // Handle error response from the backend
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

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      //handleFiles(e.target.files);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      fetch("/backend/chart-endpoint", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          // Handle the response from the backend
          console.log(response);
          // Redirect to yourchart page or handle the response accordingly
          window.location.href = "/yourchart";
        })
        .catch((error) => {
          // Handle error
          console.error(error);
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
        <Snackbar
          open={errorAlertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          message="Error occurred while processing the file."
        />
        <Button
          id="form-Button"
          variant="contained"
          color="success"
          href="/yourchart"
        >
          Upload and create chart
        </Button>
        <Button
          id="form-Button"
          variant="contained"
          color="success"
          href="/newchart"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default DragDropFile;
