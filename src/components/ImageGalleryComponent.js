import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();


const ImageGalleryComponent = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [imagesLeft, setImagesLeft] = useState([]);
  const [imagesRight, setImagesRight] = useState([]);
  const [currentIndexLeft, setCurrentIndexLeft] = useState(0);
  const [currentIndexRight, setCurrentIndexRight] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dates, setDates] = useState([]);
  const [selectedDateLeft, setSelectedDateLeft] = useState("");
  const [selectedDateRight, setSelectedDateRight] = useState("");
  const [isSplitScreen, setIsSplitScreen] = useState(true);
  const [is360View, setIs360View] = useState(false);
  const [dateToIdMap, setDateToIdMap] = useState({});
  const [imageUrlLeft, setImageUrlLeft] = useState("");
  const [imageUrlRight, setImageUrlRight] = useState("");

  useEffect(() => {
    if (id) {
      fetchDates(id);
    } else {
      console.error("ID is undefined.");
    }
  }, [id]);

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setCurrentIndexLeft((prevIndex) => (prevIndex + 1) % imagesLeft.length);
        setCurrentIndexRight((prevIndex) => (prevIndex + 1) % imagesRight.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [imagesLeft.length, imagesRight.length, isPaused]);

  const fetchImages = async (id, date, isRight) => {
    try {
      const frameId = dateToIdMap[date];
      if (!frameId) {
        console.error("No frame ID found for the selected date.");
        isRight ? setImagesRight([]) : setImagesLeft([]);
        return;
      }

      const response = await fetch(
        `https://967d-103-175-108-234.ngrok-free.app/building/api/video-frames/plan/${id}/video/${frameId}/`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "98547",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const imageData = await response.json();
      if (Array.isArray(imageData)) {
        const validImages = imageData.filter(
          (image) => image && image.image
        );
        if (isRight) {
          setImagesRight(validImages);
          setCurrentIndexRight(0);
          setImageUrlRight(validImages[0]?.image ? `https://967d-103-175-108-234.ngrok-free.app${validImages[0].image}` : "");
        } else {
          setImagesLeft(validImages);
          setCurrentIndexLeft(0);
          setImageUrlLeft(validImages[0]?.image ? `https://967d-103-175-108-234.ngrok-free.app${validImages[0].image}` : "");
        }
      } else {
        console.warn("Unexpected API response structure:", imageData);
        isRight ? setImagesRight([]) : setImagesLeft([]);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      isRight ? setImagesRight([]) : setImagesLeft([]);
    }
  };

  const fetchDates = async (id) => {
    try {
      const response = await fetch(
        `https://967d-103-175-108-234.ngrok-free.app/building/api/video-frames/plan/${id}/`,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "98547",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.video_frames) {
        const dateList = data.video_frames.map((frame) => ({
          date: frame.upload_date || "Unknown",
          frameId: frame.id
        }));

        const dateMap = {};
        dateList.forEach(({ date, frameId }) => {
          dateMap[date] = frameId;
        });

        setDates(dateList.map(({ date }) => date));
        setDateToIdMap(dateMap);

        if (dateList.length > 0) {
          const firstDate = dateList[0].date;
          setSelectedDateLeft(firstDate);
          setSelectedDateRight(firstDate);
          fetchImages(id, firstDate, false);
          fetchImages(id, firstDate, true);
        }
      } else {
        console.warn("Unexpected API response structure:", data);
      }
    } catch (error) {
      console.error("Failed to fetch dates:", error);
    }
  };

  const handleDateChangeLeft = (event) => {
    const newDate = event.target.value;
    setSelectedDateLeft(newDate);
    fetchImages(id, newDate, false);
  };

  const handleDateChangeRight = (event) => {
    const newDate = event.target.value;
    setSelectedDateRight(newDate);
    fetchImages(id, newDate, true);
  };

  const handleNextLeft = () => {
    setCurrentIndexLeft((currentIndexLeft + 1) % imagesLeft.length);
    setCurrentIndexRight((currentIndexRight + 1) % imagesRight.length);
  };

  const handleNextRight = () => {
    setCurrentIndexRight((currentIndexRight + 1) % imagesRight.length);
    setCurrentIndexLeft((currentIndexLeft + 1) % imagesLeft.length);

  };

  const handlePrevLeft = () => {
    setCurrentIndexLeft((currentIndexLeft - 1 + imagesLeft.length) % imagesLeft.length);
    setCurrentIndexRight((currentIndexRight - 1 + imagesRight.length) % imagesRight.length);
  };

  const handlePrevRight = () => {
    setCurrentIndexLeft((currentIndexLeft - 1 + imagesLeft.length) % imagesLeft.length);
    setCurrentIndexRight((currentIndexRight - 1 + imagesRight.length) % imagesRight.length);
  };

  const handlePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const handleImageClick = () => {
    setIsPaused(true);
  };

  const handleModeChange = (mode) => {
    if (mode === 'split') {
      setIs360View(false);
      setIsSplitScreen(true);
    } else if (mode === 'vr') {
      setIs360View(true);
      setIsSplitScreen(false);
    }
  };

  useEffect(() => {
    if (is360View) {
      const newImageUrl = imageUrlLeft;
      setImageUrlLeft(newImageUrl);
    }
  }, [selectedDateLeft, is360View]);

  const renderImage = (imageObj) => {
    if (!imageObj || typeof imageObj !== 'object' || !imageObj.image) {
      return (
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography variant="caption" color="textSecondary">
            No Image Available
          </Typography>
        </div>
      );
    }

    const url = `https://967d-103-175-108-234.ngrok-free.app${imageObj.image}`;
    const timestamp = imageObj.timestamp || "Unknown Date";

    return (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          style={{
            position: "absolute",
            top: "4px",
            left: "4px",
            padding: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "4px",
          }}
        >
          {timestamp}
        </Typography>
        <VRScene imageUrl={url}/>
        {/* <img
          src={url}
          alt="Gallery"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            cursor: "pointer",
          }}
          
          onClick={handleImageClick}
        /> */}
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* <ButtonGroup variant="contained" aria-label="outlined primary button group"> */}
          {/* <Button onClick={() => handleModeChange('split')}>Split Screen</Button> */}
          {/* <Button onClick={() => handleModeChange('vr')}>VR View</Button> */}
        {/* </ButtonGroup> */}

        {isSplitScreen && (
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ flex: 1, padding: '10px' }}>
              <Typography variant="h6">Select Date</Typography>
              <Select
                value={selectedDateLeft}
                onChange={handleDateChangeLeft}
                fullWidth
              >
                {dates.map(date => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                style={{ marginTop: '10px', marginLeft:"70%" }}
              >
                <Button onClick={handlePrevLeft}>Previous</Button>
                <Button onClick={handlePause}>{isPaused ? 'Play' : 'Pause'}</Button>
                <Button onClick={handleNextLeft}>Next</Button>
              </ButtonGroup>
              <div style={{ height: '70vh', marginTop: '10px' }}>
                {renderImage(imagesLeft[currentIndexLeft])}
              </div>
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
              <Typography variant="h6">Select Date</Typography>
              <Select
                value={selectedDateRight}
                onChange={handleDateChangeRight}
                fullWidth
                style={{marginBottom:45}}
              >
                {dates.map(date => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
              {/* <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                style={{ marginTop: '10px' }}
              >
                <Button onClick={handlePrevRight}>Previous</Button>
                <Button onClick={handlePause}>{isPaused ? 'Play' : 'Pause'}</Button>
                <Button onClick={handleNextRight}>Next</Button>
              </ButtonGroup> */}
              <div style={{ height: '70vh', marginTop: '10px' }}>
                {renderImage(imagesRight[currentIndexRight])}
              </div>
            </div>
          </div>
        )}

        {is360View && (
          <div style={{ width: '100%', height: '100%' }}>
            <Typography variant="h6">VR View</Typography>
            <Select
              value={selectedDateLeft}
              onChange={(e) => {
                const newDate = e.target.value;
                setSelectedDateLeft(newDate);
                fetchImages(id, newDate, false);
              }}
              fullWidth
            >
              {dates.map(date => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
            <div style={{ height: '80vh', marginTop: '10px' }}>
            <VRScene imageUrl={imageUrlLeft}/>
              {/* <Scene360View imageUrl={imageUrlLeft} /> */}
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );  
};


const VRScene = ({ imageUrl }) => {
  const [skySrc, setSkySrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      console.log("Fetching image data...");
      try {
        const response = await fetch(imageUrl, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "98547",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setSkySrc(reader.result); // Set the Base64 string as the source
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
        setSkySrc(imageUrl); // Fallback to direct URL if needed
      }
    };

    fetchImage();
  }, [imageUrl]);

  return (
    <a-scene embedded vr-mode-ui="enabled: true" style={{ height: '100%', width: '100%' }}>
      <a-sky src={skySrc} rotation="0 0 0"></a-sky>
      <a-light type="ambient" color="#888"></a-light>
      <a-light type="directional" position="-1 1 0" color="#FFF"></a-light>
    </a-scene>
  );
};


export default ImageGalleryComponent;
