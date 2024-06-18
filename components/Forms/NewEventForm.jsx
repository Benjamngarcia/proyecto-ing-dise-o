import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  FormLabel
} from "@mui/material";

function NewEventForm({ open, handleClose }) {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    categories: [],
    address: {},
    img: null,
    eventType: "fixed",
    startDate: '',
    endDate: '',
  });

  const handleNext = () => {
    if (step === 4) {
      saveEvent();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const saveEvent = () => {
    const finalDates = eventData.eventType === "temporary" ?
      `${formatDate(eventData.startDate)} - ${formatDate(eventData.endDate)}` : "All time";
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    const newEvent = {
      ...eventData,
      dates: finalDates,
      is_boosted: false,
      scoreAvg: 0,
      comments: [],
    };
    existingEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(existingEvents));
    handleClose();
  };

  const handleInputChange = (field, value) => {
    if (["city", "state", "zip", "number"].includes(field)) {
      setEventData({
        ...eventData,
        address: {
          ...eventData.address,
          [field]: value
        }
      });
    } else if(field === "isOwner") {
      const userInfo = localStorage.getItem("userSession");
      const user = JSON.parse(userInfo);
      setEventData({
        ...eventData,
        creator: {
          id_user: user.id,
          name: user.name,
          eventCount: 1
        }
      });
    }else {
      setEventData({ ...eventData, [field]: value });
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      handleInputChange('img', URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCategoryChange = (category) => {
    setEventData({
      ...eventData,
      categories: [...eventData.categories, category],
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <RadioGroup
            name="isOwner"
            onChange={(e) => handleInputChange("isOwner", e.target.value)}
          >
            <FormLabel>Are you the event owner?</FormLabel>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        );
      case 2:
        return (
          <>
            <TextField
              fullWidth
              label="Event Name"
              onChange={(e) => handleInputChange("name", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              onChange={(e) => handleInputChange("description", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Add Category"
              onBlur={(e) => handleCategoryChange(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </>
        );
      case 3:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Type of Event</FormLabel>
            <RadioGroup
              name="eventType"
              onChange={(e) => handleInputChange("eventType", e.target.value)}
            >
              <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
              <FormControlLabel value="temporary" control={<Radio />} label="Temporary" />
            </RadioGroup>
            {eventData.eventType === "temporary" && (
              <>
                <TextField
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  margin="normal"
                />
                <TextField
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  margin="normal"
                />
              </>
            )}
          </FormControl>
        );
      case 4:
        return (
          <>
            <TextField
              fullWidth
              label="City"
              onChange={(e) => handleInputChange("city", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="State"
              onChange={(e) => handleInputChange("state", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Zip Code"
              onChange={(e) => handleInputChange("zip", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Number"
              onChange={(e) => handleInputChange("number", e.target.value)}
              margin="normal"
            />
          </>
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Event (Step {step} of 4)</DialogTitle>
      <DialogContent>
        {renderStepContent(step)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {step > 1 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        <Button onClick={handleNext}>{step === 4 ? "Finish" : "Next"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewEventForm;
